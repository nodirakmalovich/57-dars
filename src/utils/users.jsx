import axios from "axios";
import { useState, useEffect } from "react";
import Hero from "../layouts/hero/hero";

export default function UsersData() {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        axios
            .get("https://dummyjson.com/users")
            .then((res) => {
                setData(res?.data.users);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    return <Hero data={data} loading={loading} setData={setData}/>;
}