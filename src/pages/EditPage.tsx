import { useEffect, useState } from 'react';
import classes from '../styles/Page/CreatePageForm.module.css'
import useHttp from '../hooks/useHttp';
import { useLoggedUserInformation } from '../hooks/useLoggedUserInformation';
import { useNavigate, useParams } from 'react-router-dom';
import PageResponse from '../model/response/PageResponse';
import { validateEmptyString } from '../util/validation';
import UpdatePageRequest from '../model/request/UpdatePageRequest';

const EditPage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Travel")
  const [nameError, setNameError] = useState("")
  const [descriptionError, setDescriptionError] = useState("")
  const [categoryError, setCategoryError] = useState("")

  const { isLoading, sendRequest } = useHttp();
  const userInformation = useLoggedUserInformation();
  const navigate = useNavigate();
  const params = useParams();

  const applyPageResponseData  = (pageData: PageResponse) => {
    setName(pageData.name)
    setDescription(pageData.description)
    setCategory(pageData.category)
  }

  useEffect(() => {
    sendRequest({
        url:
          "http://localhost:8081/api/v1/page/getPage?pageId=" + params.pageId,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userInformation?.tokens.accessToken,
        }
      },
      applyPageResponseData)
  }, [])

  const applyData = (data: PageResponse) => {
    navigate("/viewPage/" + params.pageId+ "/" + data.administratorId)
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

    const pageRequest = new UpdatePageRequest(parseInt(params.pageId!), name, description, category, null)

    sendRequest(
      {
        url:
          "http://localhost:8081/api/v1/page/update",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userInformation?.tokens.accessToken,
        },
        body: pageRequest
      },
      applyData
    );    

    setNameError("")
    setDescriptionError("")
    setCategoryError("")
  };

  return (
    <div className={classes.container}>
      <form onSubmit={submitHandler}>
        <h2>Edit page</h2>
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            onChange={(event) => {
              setName(event.target.value);
            }}
            value={name}
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
            value={description}
          />
          <p className={classes.error}>{descriptionError}</p>
        </div>
        <div >
              <label htmlFor="gender">Gender</label>
              <select
                onChange={(event) => setCategory(event.target.value)}
                placeholder="Choose your gender..."
                value={category}
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
            {isLoading ? "Editing..." : "Edit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPage;
