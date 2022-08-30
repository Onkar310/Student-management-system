import React from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

function Students({ student }) {
  return (
    <div className="students">
      <h4>.</h4>
      <p>
        <strong>First Name: </strong>
        {student.firstname}
      </p>

      <p>
        <strong>last Name: </strong>
        {student.lastname}
      </p>

      <p>
        <strong>Email: </strong>
        {student.email}
      </p>
      <p>
        {formatDistanceToNow(new Date(student.createdAt), { addSuffix: true })}
      </p>
    </div>
  );
}

export default Students;
