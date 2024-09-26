async function main() {
    const Data = {
        name: "test",
        id: 11
    }
    const otherParam = {
        headers: {
            "Content-Type": "application/json"
        },
        body: Data,
        method: "POST"
    }
    await fetch("http://localhost:4000/")
        .then(res => {console.log(res)})
}