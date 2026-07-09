import axios from "axios";
import API from "./axios";

export const createProfile =
    (data) =>
        API.post(
            "/provider/create-profile",
            data
        );