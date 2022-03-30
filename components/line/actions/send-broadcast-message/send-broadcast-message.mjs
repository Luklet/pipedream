import line from "../../line.app.mjs";

export default {
  name: "Send Broadcast Message",
  description: "Sends a broadcast message to multiple users at any time.",
  key: "line-send-broadcast-message",
  version: "0.0.1",
  type: "action",
  props: {
    line,
    channelAccessToken: {
      propDefinition: [
        line,
        "channelAccessToken",
      ],
    },
    message: {
      propDefinition: [
        line,
        "message",
      ],
    },
    notificationDisabled: {
      propDefinition: [
        line,
        "notificationDisabled",
      ],
    },
  },
  async run({ $ }) {
    const client = this.line.createLineClient(this.channelAccessToken);

    const response = client.broadcast({
      type: "text",
      text: this.message,
      notificationDisabled: this.notificationDisabled ?? false,
    });

    if (response["x-line-request-id"]) {
      $.export("$summary", "Successfully sent broadcast message");
    }

    return response;
  },
};
