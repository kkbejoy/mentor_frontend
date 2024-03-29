import {
  Calendar as BigCalendar,
  // CalendarProps,
  momentLocalizer,
} from "react-big-calendar";
import moment from "moment";
import "../Scheduler/calender.css";

const localizer = momentLocalizer(moment);

export default function Calendar(props) {
  return <BigCalendar {...props} localizer={localizer} />;
}
