import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaValidateRegister } from "@/src/app/(Auth)/validate";
import {
  create_Account,
  set_role_user_to_seller,
  logout,
  refesh_token,
  sign_In,
  update_profile_account,
  authenticate_with_google,
} from "../../Services/Services_Auth/Auth";
import { useCheck_user } from "../../Custome_Hooks/User";

type Actions =
  | "LOGIN"
  | "REGISTER"
  | "AUTHENTICATE_WITH_GOOGLE"
  | "SET_ROLE_USER_TO_SELLER"
  | "LOGOUT"
  | "REFESH_TOKEN";
export function Mutation_Auth({ action }: { action: Actions }) {
  const user = useCheck_user();
  let check_validate_register: any;
  if (action === "REGISTER") {
    check_validate_register = yupResolver(schemaValidateRegister);
  }
  const [status_Loading, setStatus_Loading] = useState("no_call");
  const my_form = useForm({
    resolver: yupResolver(schemaValidateRegister),
  });
  const query_Client = useQueryClient();

  const { mutate, ...rest } = useMutation({
    mutationFn: async (dataClient: any) => {
      setStatus_Loading("pending_call");
      switch (action) {
        case "LOGIN":
          return await sign_In(dataClient);
        case "REGISTER":
          return await create_Account(dataClient);
        case "AUTHENTICATE_WITH_GOOGLE":
          return await authenticate_with_google(dataClient);
        case "SET_ROLE_USER_TO_SELLER":
          return await set_role_user_to_seller(dataClient);
        case "LOGOUT":
          return await logout();
        case "REFESH_TOKEN":
          return await refesh_token();
        default:
          return;
      }
    },
    onSuccess: (res: any) => {
      query_Client.invalidateQueries({
        queryKey: ["Auth_Key"],
      });
      if (res.status === 201 || res.status === 200) {
        setStatus_Loading("call_ok");
      } else {
        setStatus_Loading("call_error");
      }
      if (res?.new_token) {
        const new_localStorage = {
          ...user,
          accessToken: res?.new_token,
        };
        localStorage.setItem("account", JSON.stringify(new_localStorage));
      }
    },
  });

  const onSubmit: SubmitHandler<any> = (data: any) => {
    mutate(data);
  };
  return { status_Loading, my_form, onSubmit, ...rest };
}

export function Mutation_update_auth() {
  const query_Client = useQueryClient();

  const form_data = useForm();

  const { mutate, ...rest } = useMutation({
    mutationFn: async (data_request) => {
      return await update_profile_account(data_request);
    },
    onSuccess: () => {
      query_Client.invalidateQueries({
        queryKey: ["Auth_Key"],
      });
    },
    onError: (err) => err,
  });

  const submitForm: SubmitHandler<any> = (data: any) => {
    const formData = new FormData();
    let data_req: any = {};
    if (data?.new_avatar) {
      formData.append("new_avatar", data.new_avatar[0]);
      data_req = formData;
    } else {
      formData.append("new_phone", data.new_phone);
      data_req = formData;
    }
    mutate(data_req);
  };
  return { submitForm, form_data, ...rest };
}
