import { object, string } from "yup";

export const menteesInputWhileFixingTimeSlot = object().shape({
  menteeQueryTitle: string().trim().required("This field is required"),
  menteeQueryDescription: string().trim().required("This field is required"),
});
