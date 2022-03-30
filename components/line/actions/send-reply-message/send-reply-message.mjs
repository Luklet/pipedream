import line from "../../line.app.mjs";

export default {
  name: "Send Reply Message",
  description: "Sends a reply message in response to an event from a user, group, or room. [See docs](https://developers.line.biz/en/reference/messaging-api/#send-reply-message)",
  key: "line-send-reply-message",
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
    replyToken: {
      label: "Message Reply Token",
      type: "string",
      description: "Reply token of the received message.",
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

    const response = client.replyMessage(this.replyToken, {
      type: "text",
      text: this.message,
      notificationDisabled: this.notificationDisabled ?? false,
    });

    if (response["x-line-request-id"]) {
      $.export("$summary", "Successfully sent reply message");
    }

    return response;
  },
};
