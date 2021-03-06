import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
  const [form, setForm] = useState({
    name: "",
    description: "",
  });
  const navigate = useNavigate();

  // these methods will update the state properties
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // this function will handle the submission
  async function onSubmit(e) {
    e.preventDefault();

    // when a post request is sent to the create url,
    // we'll add a new record to the database

    const newPet = { ...form };

    await fetch("http://localhost:5001/record/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPet),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    setForm({ name: "", description: "" });
    navigate("/");
  }

  // this section displays the form that takes the input from the user

  return (
    <div>
      <h3>Add new pet</h3>
      <form onSubmit={onSubmit}>
        <div className="from-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
        </div>
        <div className="from-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            value={form.description}
            onChange={(e) => updateForm({ description: e.target.value })}
          />
        </div>
        <div className="form-group">
          <input type="submit" value="Add pet" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
}
