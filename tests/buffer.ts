 function main() {
    const buffer1 = Buffer.from("hello", 'utf-8');
    const buffer2 = Buffer.from("world",'utf-8');
    const buffer3 = Buffer.concat([buffer1, buffer2]);
    console.log(buffer3.toString())
}
main()