import { axios } from "@pipedream/platform";

export default {
  type: "app",
  app: "xero_accounting_api",
  propDefinitions: {
    tenant_id: {
      type: "string",
      description:
        "Id of the organization tenant to use on the Xero Accounting API.  See [Get Tenant Connections](https://pipedream.com/@sergio/xero-accounting-api-get-tenant-connections-p_OKCzOgn/edit) for a workflow example on how to pull this data.",
    },
  },
  methods: {
    // this.$auth contains connected account data
    async createContact(tenant_id, payload) {
      const response = await axios(this.$auth, {
        method: "post",
        url: "https://api.xero.com/api.xro/2.0/contacts",
        headers: {
          Authorization: `Bearer ${this.$auth.oauth_access_token}`,
          "xero-tenant-id": tenant_id,
        },
        payload,
      });
      // response &&
      //   $.export(
      //     "$summary",
      //     `Contact successfully ${
      //       actionType === "UPDATE" ? "updated" : "created"
      //     }`
      //   );
      return response;
    },
    async getContact(tenant_id, queryParam) {
      return await axios(this.$auth, {
        method: "get",
        url: `https://api.xero.com/api.xro/2.0/contacts?Where=${queryParam}`,
        headers: {
          Authorization: `Bearer ${this.$auth.oauth_access_token}`,
          "xero-tenant-id": tenant_id,
        },
      });
    },
  },
};
