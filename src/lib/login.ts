export type LoginResponse =
  | { readonly ok: true }
  | {
      readonly ok: false;
      readonly code:
        | "INVALID_REQUEST"
        | "INVALID_PASSWORD"
        | "SITE_NOT_CONFIGURED";
    };