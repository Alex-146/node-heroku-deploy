const { Dropbox } = require("dropbox");

const { accessToken } = require("../user-config");

const dropbox = new Dropbox({ accessToken });

async function downloadScript() {
  try {
    const response = await dropbox.filesDownload({ path: "/wifi.ps1" });
    return { ok: true, data: response.result };
  }
  catch (error) {
    console.log(error);
    return { ok: false }    
  }
}

async function uploadFile(path, contents) {
  try {
    const uploadResponse = await dropbox.filesUpload({ path, contents });

    // ! uploaded successfully, now create shared link
    const linkReponse = await dropbox.sharingCreateSharedLinkWithSettings({ path });
    
    // ! url received
    const url = linkReponse.result.url;
    return {
      ok: true,
      data: { url }
    }
  }
  catch(error) {
    return { 
      ok: false
    }
  }
}

module.exports = { downloadScript, uploadFile }
