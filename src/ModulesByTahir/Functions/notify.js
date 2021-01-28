// import { toast } from "react-toastify";
// import { css } from "glamor";
import { ToastsContainer, ToastsStore } from "react-toasts";

function notify(type, message) {
  if (type === "success") {
    ToastsStore.success(message);
    // toast.success(message, {
    //   position: toast.POSITION.TOP_RIGHT,
    //   toastId: 1,
    //   bodyClassName: css({
    //     fontSize: "20px"
    //   })
    // });
  }
  if (type === "error") {
    ToastsStore.error(message);
    // toast.error(message, {
    //   position: toast.POSITION.TOP_RIGHT,
    //   toastId: 2,
    //   bodyClassName: css({
    //     fontSize: "20px"
    //   })
    // });
  }
  if (type === "warning") {
    ToastsStore.error(message);
    // toast.warning(message, {
    //   position: toast.POSITION.TOP_RIGHT,
    //   toastId: 3,
    //   bodyClassName: css({
    //     fontSize: "20px"
    //   })
    // });
  }
}
export default notify;
