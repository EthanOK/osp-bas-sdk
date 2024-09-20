import { MQClient } from "@aliyunmq/mq-http-sdk";

import {
  getDeployer,
  getMulAttestParams,
  GreenFieldClientTS,
  handleOspRequestData,
  handleOspRequestPrepareOffChain,
  MultiAttestationRequest,
  multiAttestBASOffChain,
  multiAttestBASOnChain,
  serializeJsonString,
} from "osp-bas-sdk";

const chainId = 5611;

const onChain = true;

const bucketName = "bas-osp-dev";

const PrivateKey = "GreenField";

const greenFieldClient = new GreenFieldClientTS(
  "https://gnfd-testnet-fullnode-tendermint-us.bnbchain.org",
  "5600",
  "0x6278A1E803A76796a3A1f7F6344fE874ebfe94B2"
);

const Global_UnHandle_Data = [];

// 设置HTTP协议客户端接入点，进入消息队列RocketMQ版控制台实例详情页面的接入点区域查看。
const endpoint =
  "http://1811730164342742.mqrest.cn-qingdao-public.aliyuncs.com";
// 请确保环境变量 ALIBABA_CLOUD_ACCESS_KEY_ID; ALIBABA_CLOUD_ACCESS_KEY_SECRET 已设置。
// AccessKey ID，阿里云身份验证标识。
const accessKeyId = process.env.ALIBABA_CLOUD_ACCESS_KEY_ID;
// AccessKey Secret，阿里云身份验证密钥。
const accessKeySecret = process.env.ALIBABA_CLOUD_ACCESS_KEY_SECRET;

var client = new MQClient(endpoint, accessKeyId, accessKeySecret);

// 消息所属的Topic，在消息队列RocketMQ版控制台创建。
const topic = "T_CONTRACT_CHAIN_EVENT_OSP_DEV";
// 您在消息队列RocketMQ版控制台创建的Group ID。
const groupId = "GID_BAS_OSP_DEV";
// Topic所属的实例ID，在消息队列RocketMQ版控制台创建。
// 若实例有命名空间，则实例ID必须传入；若实例无命名空间，则实例ID传入null空值或字符串空值。实例的命名空间可以在消息队列RocketMQ版控制台的实例详情页面查看。
const instanceId = "";

const consumer = client.getConsumer(instanceId, topic, groupId);
let res = null;
(async function () {
  const signer = await getDeployer();

  // 循环消费消息。
  while (true) {
    try {
      // 长轮询消费消息。
      // 长轮询表示如果Topic没有消息，则客户端请求会在服务端挂起3s，3s内如果有消息可以消费则立即返回响应。
      res = await consumer.consumeMessage(
        3, // 一次最多消费3条（最多可设置为16条）。
        3 // 长轮询时间3秒（最多可设置为30秒）。
      );

      if (res.code == 200) {
        // 消息消费处理逻辑。
        console.log("Consume Messages, requestId:%s", res.requestId);
        const handles = res.body.map(async (message) => {
          // console.log(
          //   "\tMessageId:%s,Tag:%s,PublishTime:%d,NextConsumeTime:%d,FirstConsumeTime:%d,ConsumedTimes:%d,Body:%s" +
          //     ",Props:%j,MessageKey:%s,Prop-A:%s",
          //   message.MessageId,
          //   message.MessageTag,
          //   message.PublishTime,
          //   message.NextConsumeTime,
          //   message.FirstConsumeTime,
          //   message.ConsumedTimes,
          //   message.MessageBody,
          //   message.Properties,
          //   message.MessageKey,
          //   message.Properties.a
          // );

          // console.log(message.MessageBody);

          if (onChain) {
            const handleOspReturnData = handleOspRequestData(
              chainId,
              message.MessageBody
            );

            console.log(handleOspReturnData);

            if (handleOspReturnData.requestData != null) {
              Global_UnHandle_Data.push(handleOspReturnData);
            }

            if (Global_UnHandle_Data.length >= 2) {
              console.log("Global_UnHandle_Data length:");
              console.log(Global_UnHandle_Data.length);

              const params: MultiAttestationRequest[] =
                getMulAttestParams(Global_UnHandle_Data);

              multiAttestBASOnChain(signer, params);

              Global_UnHandle_Data.length = 0;
            }
          } else {
            const handleOspReturnDataOffChain = handleOspRequestPrepareOffChain(
              chainId,
              message.MessageBody
            );
            console.log(handleOspReturnDataOffChain);
            if (handleOspReturnDataOffChain.requestData != null) {
              Global_UnHandle_Data.push(handleOspReturnDataOffChain);
            }
            if (Global_UnHandle_Data.length >= 2) {
              console.log("Global_UnHandle_Data length:");
              console.log(Global_UnHandle_Data.length);

              const attestations = await multiAttestBASOffChain(
                signer,
                Global_UnHandle_Data
              );

              greenFieldClient.createObjectMulAttest(
                bucketName,
                serializeJsonString(attestations),
                PrivateKey,
                "",
                false
              );
            }
          }

          return message.ReceiptHandle;
        });

        // message.NextConsumeTime前若不确认消息消费成功，则消息会被重复消费。
        // 消息句柄有时间戳，同一条消息每次消费拿到的都不一样。
        res = await consumer.ackMessage(handles);
        if (res.code != 204) {
          // 某些消息的句柄可能超时，会导致消息消费状态确认不成功。
          console.log("Ack Message Fail:");
          const failHandles = res.body.map((error) => {
            console.log(
              "\tErrorHandle:%s, Code:%s, Reason:%s\n",
              error.ReceiptHandle,
              error.ErrorCode,
              error.ErrorMessage
            );
            return error.ReceiptHandle;
          });
          handles.forEach((handle) => {
            if (failHandles.indexOf(handle) < 0) {
              console.log("\tSucHandle:%s\n", handle);
            }
          });
        } else {
          // 确认消息消费成功。
          console.log(
            "Ack Message suc, RequestId:%s\n\t",
            res.requestId,
            handles.join(",")
          );
        }
      }
    } catch (e) {
      if (e.Code.indexOf("MessageNotExist") > -1) {
        // 没有消息，则继续长轮询服务器。
        console.log(
          "Consume Message: no new message, RequestId:%s, Code:%s",
          e.RequestId,
          e.Code
        );
      } else {
        console.log(e);
      }
      // console.log(e);
    }
  }
})();
