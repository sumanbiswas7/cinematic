export async function uploadImagetoS3(file: File, uploadUrl: string) {
    // Post the image direclty to the s3 bucket

    try {
        await fetch(uploadUrl, {
            method: "PUT",
            headers: {
                "Content-Type": "multipart/form-data",
            },
            body: file,
        })
        return { err: false, url: uploadUrl.split("?")[0] };
    }
    catch (e) {
        console.error(e)
        return { err: true, url: "uploadToS3 failed" };
    }
}



// export async function uploadImagetoS3(file: File, uploadUrl: string) {
//     // Post the image direclty to the s3 bucket
//     await fetch(uploadUrl, {
//         method: "PUT",
//         headers: {
//             "Content-Type": "multipart/form-data",
//         },
//         body: file,
//     })
//         .then(() => {
//             const imageUrl = uploadUrl.split("?")[0];
//             return imageUrl
//         })
//         .catch((e) => {
//             console.error(e)
//             return "Upload Failed"
//         });
// }
