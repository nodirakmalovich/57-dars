import { Button, Input, Select } from "antd";
import { useRef, useState } from "react";
import axios from "axios";
import '../../App.css';

export default function Navbar({ data, setData, setFilteredUser }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedGender, setSelectedGender] = useState("Chose your gender");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [image, setImage] = useState("");
    const [email, setEmail] = useState("");

    const searchRef = useRef()

    const addUser = () => {
        if (!data) return;

        const newUserData = {
            id: data.length + 1,
            firstName,
            lastName,
            image,
            address: {
                city,
                state,
            },
            gender: selectedGender,
            email,
        };

        const newUserPost = {
            id: data.length + 1,
            firstName,
            lastName,
            image,
            userId: 5,
        };

        axios
            .post("https://dummyjson.com/todos/add", newUserPost)
            .then((res) => {
                console.log(res);
                setData([newUserData, ...data]);
            })
            .catch(err => {
                console.log(err);
            });

        setFirstName("");
        setLastName("");
        setEmail("");
        setCity("");
        setState("");
        setImage("");
        setSelectedGender("Chose your gender");

        setIsModalOpen(false);
    };

    const searchTask = () => {
        const filteredUser = data.filter(user => user.firstName.toLowerCase().includes(searchRef.current.input.value))
        setFilteredUser(filteredUser)
    }

    const handleGenderChange = (value) => {
        setSelectedGender(value);
        if (value === "All") {
            setFilteredUser(data);
        } else {
            const filteredUser = data.filter(user => user.gender === value);
            setFilteredUser(filteredUser);
        }
    };

    return (
        <div className="navbar">
            {isModalOpen && <div className="backdrop" onClick={() => setIsModalOpen(false)} />}

            <div className="container">
                <div className="navbar_row mt-5 flex flex-wrap lg:flex-nowrap justify-center lg:justify-between gap-5">
                    <Input ref={searchRef} onChange={searchTask} allowClear placeholder="Search employee" size="large" className="md:w-full"/>
                    <Select onChange={handleGenderChange} size="large" defaultValue="All" style={{ width: 120 }}>
                        <Select.Option value="All">All</Select.Option>
                        <Select.Option value="male">Male</Select.Option>
                        <Select.Option value="female">Female</Select.Option>
                    </Select>
                    <Button type="primary" size="large" onClick={() => setIsModalOpen(true)}>
                        Add employee
                    </Button>
                </div>

                <div className="add_modal" style={{ display: isModalOpen ? 'flex' : 'none' }}>
                    <Input
                        allowClear
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        placeholder="First Name"
                        size="large"
                    />
                    <Input
                        allowClear
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        placeholder="Last Name"
                        size="large"
                    />
                    <Input
                        allowClear
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Email address"
                        size="large"
                    />
                    <Input
                        allowClear
                        value={image}
                        onChange={e => setImage(e.target.value)}
                        type="url"
                        placeholder="image url"
                        size="large"
                    />
                    <Select
                        size="large"
                        defaultValue="Chose your gender"
                        className="w-full"
                        value={selectedGender}
                        onChange={setSelectedGender}
                    >
                        <Select.Option value="Male">Male</Select.Option>
                        <Select.Option value="Female">Female</Select.Option>
                    </Select>
                    <Input
                        allowClear
                        value={state}
                        onChange={e => setState(e.target.value)}
                        placeholder="State"
                        size="large"
                    />
                    <Input
                        allowClear
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        placeholder="City"
                        size="large"
                    />

                    <div className="modal_btns flex w-full flex-wrap sm:flex-nowrap justify-center sm:justify-end gap-5">
                        <Button
                            type="secondary"
                            className="bg-gray-400 text-white "
                            size="large"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Close
                        </Button>
                        <Button
                            type="primary"
                            size="large"
                            onClick={addUser}
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
