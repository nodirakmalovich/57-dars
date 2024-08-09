import { Button, Card, Spin, Input, Select } from 'antd';
import { useState } from "react";

const { Meta } = Card;



export default function Hero({ data, setData, loading, filteredUser, setFilteredUser }) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenInfo, setIsModalOpenInfo] = useState(false);
    const [selectedGender, setSelectedGender] = useState("Chose your gender");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [image, setImage] = useState("");
    const [email, setEmail] = useState("");

    const [showUser, setShowUser] = useState([])

    const [editTodo, setEditTodo] = useState(null)

    const deleteUser = (userId) => {
        const newData = data.filter(user => user.id !== userId)
        setData(newData)
        setFilteredUser(newData);
    }

    const editUser = (user) => {

        setIsModalOpen(true)

        setFirstName(user.firstName)
        setLastName(user.lastName)
        setCity(user.address.city)
        setState(user.address.state)
        setImage(user.image)
        setEmail(user.email)
        setSelectedGender(user.gender)

        setEditTodo(user)
    }

    const saveEditUser = () => {
        const cloneData = [...data]
        const selectedIndex = data.findIndex((user) => user.id === editTodo.id)

        cloneData[selectedIndex].firstName = firstName
        cloneData[selectedIndex].lastName = lastName
        cloneData[selectedIndex].address.city = city
        cloneData[selectedIndex].address.state = state
        cloneData[selectedIndex].image = image
        cloneData[selectedIndex].email = email
        cloneData[selectedIndex].gender = selectedGender
        setIsModalOpen(false)

    }

    const showInfo = (user) => {
        setIsModalOpenInfo(true)

        setShowUser({
            ...user,
            address: user.address || { city: "", state: "" }
        });
    }

    if (loading) {

        return (
            <div className="container flex justify-center items-center" style={{ height: '100vh' }}>
                <Spin size="large" />
            </div>
        );
    }



    return (
        <div className="container">
            {(isModalOpen || isModalOpenInfo) && <div className="backdrop"
                onClick={() => {
                    setIsModalOpen(false);
                    setIsModalOpenInfo(false);
                }} />}

            <div className="edit_modal" style={{ display: isModalOpen ? 'flex' : 'none' }}>
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
                        className="bg-gray-400 text-white"
                        size="large"
                        onClick={() => setIsModalOpen(false)}
                    >
                        Close
                    </Button>
                    <Button
                        type="primary"
                        size="large"
                        onClick={saveEditUser}
                    >
                        Save
                    </Button>
                </div>
            </div>

            <div className="info_modal" style={{ display: isModalOpenInfo ? 'flex' : 'none' }}>
                <div className="info_modal_row w-full">
                    <div className='info_modal_image flex flex-wrap justify-center'>
                        <img style={{
                            width: 280,
                            padding: '10px',
                            height: 240,
                            objectFit: 'cover',
                        }}
                            src={showUser.image}
                            alt={showUser.firstName} />
                        <h1 className='text-center w-full text-5xl font-bold'>
                            {showUser.firstName + " " + showUser.lastName}
                        </h1>
                    </div>

                    <div className="info_modal_info">
                        <table className="table-auto w-full border-collapse mt-6">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="px-4 py-2 border-b-2 border-gray-300">State</th>
                                    <th className="px-4 py-2 border-b-2 border-gray-300">City</th>
                                    <th className="px-4 py-2 border-b-2 border-gray-300">Gender</th>
                                    {showUser.company && <th className="px-4 py-2 border-b-2 border-gray-300">Department</th>}
                                    {showUser.company && <th className="px-4 py-2 border-b-2 border-gray-300">Position</th>}
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="hover:bg-gray-100">
                                    <td className="px-4 py-2 border-b text-center border-gray-300">{showUser.address?.state}</td>
                                    <td className="px-4 py-2 border-b text-center border-gray-300">{showUser.address?.city}</td>
                                    <td className="px-4 py-2 border-b text-center border-gray-300">{showUser.gender}</td>
                                    {showUser.company && <td className="px-4 py-2 border-b text-center border-gray-300">{showUser.company.department}</td>}
                                    {showUser.company && <td className="px-4 py-2 border-b text-center border-gray-300">{showUser.company.title}</td>}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="hero">
                <h1 className='text-center font-bold text-5xl my-10'>List of employees</h1>
                <div className="hero_row grid justify-items-center md:justify-items-stretch gap-10 sm:grid-cols-1  md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 ">
                    {
                        (filteredUser || data).map(user => {
                            return (
                                <Card
                                    key={user.id}
                                    hoverable
                                    style={{
                                        width: 280,
                                        padding: '10px'
                                    }}
                                    cover={<img style={{ height: 240, objectFit: 'cover', }} alt={user.firstName} src={user.image} />}
                                >
                                    <Meta title={user.firstName + " " + user.lastName} description={user.email} />

                                    <div className="buttons flex justify-between my-3 gap-2">
                                        <Button type='primary' onClick={() => showInfo(user)}>Show</Button>
                                        <Button type='primary' onClick={() => editUser(user)} >Edit</Button>
                                        <Button type='primary' danger onClick={() => deleteUser(user.id)}>Delete</Button>
                                    </div>
                                </Card>

                            )
                        })
                    }
                </div>
            </div>
        </div>

    )
}