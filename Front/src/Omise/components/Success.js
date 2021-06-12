import React from "react";

export default function Success() {
  if (
    sessionStorage.getItem("role") === "fd" ||
    sessionStorage.getItem("role") === "admin"
  ) {
    return (
      <div>
        {alert("คุณไม่ได้ทำการบริจาค")}
        {(window.location.href = "/")}
      </div>
    );
  }
  return (
    <div>
      {alert("การบริจาคเสร็จสิ้น กำลังกลับสู่หน้าแรก")}
      {(window.location.href = "/")}
    </div>
  );
}
