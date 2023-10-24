import { useState } from "react";
import useHttp from "../../hooks/useHttp";
import { useNavigate } from "react-router-dom";
import classes from '../../styles/Page/CreatePageForm.module.css'
import PageRequest from "../../model/request/PageRequest";
import { useLoggedUserInformation } from "../../hooks/useLoggedUserInformation";
import { validateEmptyString } from "../../util/validation";
import PageResponse from "../../model/response/PageResponse";

const CreatePageForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Travel")
  const [nameError, setNameError] = useState("")
  const [descriptionError, setDescriptionError] = useState("")
  const [categoryError, setCategoryError] = useState("")

  const { isLoading, sendRequest: createPageRequest } = useHttp();
  const userInformation = useLoggedUserInformation();
  const navigate = useNavigate();

  const applyData = (data: PageResponse) => {
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    var nameErrorMessage = validateEmptyString(name);
    var descriptionErrorMessage = validateEmptyString(description)

    if(nameErrorMessage !== "" || descriptionErrorMessage !== ""){
      setNameError(nameErrorMessage);
      setDescriptionError(descriptionErrorMessage);
      return;
    }

    const pageRequest = new PageRequest(name, description, category, userInformation?.user.id!)

    createPageRequest(
      {
        url:
          "http://localhost:8081/api/v1/page",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userInformation?.tokens.accessToken,
        },
        body: pageRequest
      },
      applyData
    );    

    setNameError("")
    setDescription("")
    setCategoryError("")
  };

  return (
    <div className={classes.container}>
      <form onSubmit={submitHandler}>
        <h2>Create page</h2>
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <p className={classes.error}>{nameError}</p>
        </div>
        <div>
          <label htmlFor="image">Description</label>
          <textarea
            id="description"
            name="description"
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
          <p className={classes.error}>{descriptionError}</p>
        </div>
        <div >
              <label htmlFor="gender">Gender</label>
              <select
                onChange={(event) => setCategory(event.target.value)}
                placeholder="Choose your gender..."
              >
                <option>Travel</option>
                <option>Food</option>
                <option>Fashion</option>
                <option>Fitness and Wellness</option>
                <option>Entertainment</option>
              </select>
              <p className={classes.error}>{categoryError}</p>
            </div>
        <div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePageForm;
