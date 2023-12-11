import { SideBanner } from "../../componenets/General/LeftSideBanner/SideBanner";
import EnterEmailIdComponent from "../../componenets/General/ResetPassworComponents/EnterEmailIdComponent";
export const EnterEmailIdPage = () => {
  return (
    <div className="w-full min-h-screen sm:flex">
      <SideBanner></SideBanner>
      <EnterEmailIdComponent />
    </div>
  );
};
