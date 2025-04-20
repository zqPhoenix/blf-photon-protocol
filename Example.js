const { OperationCode, ParameterCode } = require("./PhotonUtils/PhotonTypes");
const { PhotonPacketBuilder } = require("./PhotonUtils/PhotonPacketBuilder");

// Sending Announcements

function SendAnnouncement(text, duration) {
    const packet = PhotonPacketBuilder.createRequest(OperationCode.RaiseEvent)
    .addParam(ParameterCode.Code, PhotonPacketBuilder.types.byte(200))
    .addParam(ParameterCode.Cache, PhotonPacketBuilder.types.byte(4))
    .addParam(ParameterCode.Data, PhotonPacketBuilder.types.hashTable([
        [PhotonPacketBuilder.types.byte(0), PhotonPacketBuilder.types.integer(1001)], // ViewId
        [PhotonPacketBuilder.types.byte(4), PhotonPacketBuilder.types.objectArray([
            PhotonPacketBuilder.types.string(text), // Announcement Text
            PhotonPacketBuilder.types.float(duration) // Announcement Duration
        ])],
        [PhotonPacketBuilder.types.byte(5), PhotonPacketBuilder.types.byte(61)],
    ]));

    /*
        If you have a socket.send override, you'd use this to send this message whenever

    */

    let args = [];
    args[0] = packet.toBuffer();
    originalSend.apply(socket, args);

    /* 
        If you have a .send function attached to the existing socket class you'd do this
    */

    socket.send(packet.toBuffer());
};

/*
    To send this packet ->
*/

SendAnnouncement("Hello from JS!", 1000);
