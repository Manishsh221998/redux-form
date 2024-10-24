import React from 'react'
import Swal from "sweetalert2"
  const swAlert = (x,y,z) => {
   Swal.fire({
    title:x,
    icon:x,
    text:y,
    timer:z
   })
}

export default swAlert