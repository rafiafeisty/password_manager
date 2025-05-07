import React from 'react';
import eye from './icons/eye.png';
import eyecross from './icons/eyecross.png';
import { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef();
    const [form, setform] = useState({ site: "", username: "", password: "", id: "" });
    const [passwordArray, setpasswordArray] = useState([]);

    useEffect(() => {
        const passwords = localStorage.getItem("passwords");
        if (passwords) {
            const parsedpassword = JSON.parse(passwords);
            setpasswordArray(parsedpassword);
        } else {
            setpasswordArray([]);
        }
    }, []);

    const savepassword = async () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            let updatedPasswordArray;
            if (form.id) {
                // If form has an ID, it means we're editing an existing record
                updatedPasswordArray = passwordArray.map((item) =>
                    item.id === form.id ? { ...form } : item
                );
            } else {
                // If form doesn't have an ID, it means we're adding a new record
                updatedPasswordArray = [...passwordArray, { ...form, id: uuidv4() }];
            }
            setpasswordArray(updatedPasswordArray);
            localStorage.setItem("passwords", JSON.stringify(updatedPasswordArray));
            setform({ site: "", username: "", password: "", id: "" }); // Reset form
        }
    };

    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    };

    const showpassword = () => {
        alert('Show password');

        if (ref.current.src.includes(eyecross)) {
            ref.current.src = eye;
        } else {
            ref.current.src = eyecross;
        }
    };

    const copytext = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            alert('Text copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy text: ', err);
            alert('Failed to copy text to clipboard.');
        }
    };

    const editpassword = (id) => {
        let c = confirm("Do you want to edit this password?");
        if (c) {
            const passwordToEdit = passwordArray.find((item) => item.id === id);
            if (passwordToEdit) {
                setform(passwordToEdit);
            }
        }
    };

    const deletepassword = (id) => {
        let c = confirm("Do you want to delete this password?");
        if (c) {
            const updatedPasswordArray = passwordArray.filter((item) => item.id !== id);
            setpasswordArray(updatedPasswordArray);
            localStorage.setItem("passwords", JSON.stringify(updatedPasswordArray));
        }
    };

    return (
        <>
            <div>
                <div className='py-3 mx-auto justify-center flex text-3xl font-bold'>
                    <span className='bg-teal-600 text-white'>&lt;</span>
                    CipherOpera
                    <span className='bg-teal-600 text-white'>/&gt;</span>
                </div>
                <div className='flex justify-center'>
                    <p className='text-teal-700 text-2xl'>
                        Maintain your password through CipherOpera
                    </p>
                </div>
            </div>
            <div>
                <div className='w-1/2 m-auto py-5'>
                    <input onChange={handlechange} value={form.site} placeholder='Enter the url' type="text" name="site" id="" className='w-full border rounded-full border-teal-400 px-2 py-1' />
                    <div className='flex justify-between gap-4 py-4 relative'>
                        <input onChange={handlechange} value={form.username} placeholder='Enter the username' type="text" name="username" id="" className='w-full border rounded-full border-teal-400 px-2 py-1' />
                        <div className='flex justify-between relative'>
                            <input onChange={handlechange} value={form.password} placeholder='password' type="password" name="password" id="" className='w-full border rounded-full border-teal-400 px-2 py-1' />
                            <span onClick={showpassword} className='absolute flex cursor-pointer right-0 pb-3'>
                                <img ref={ref}
                                    src={ref.current && ref.current.src.includes(eyecross) ? eyecross : eye} alt="eye"
                                    className={ref.current && ref.current.src.includes(eyecross) ? "eyecross" : "eye-icon"} />
                            </span>
                        </div>
                    </div>
                </div>
                <button onClick={savepassword} className='gap-3 bg-teal-600 hover:bg-teal-400 hover:text-black flex justify-center m-auto rounded-full py-3 text-white px-3'>
                    <lord-icon
                        src="https://cdn.lordicon.com/slmechys.json"
                        trigger="hover">
                    </lord-icon>
                    Save Password
                </button>
            </div>
            <div className='flex justify-center py-12 container'>
                {passwordArray.length === 0 && <div>No passwords to display</div>}
                {passwordArray.length !== 0 &&
                    <table className="table-auto w-full rounded-md overflow-hidden ml-20">
                        <thead className='bg-teal-500'>
                            <tr>
                                <th>Website URL</th>
                                <th>Username</th>
                                <th>Password</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className='bg-teal-100'>
                            {passwordArray.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td className='w-32 border-2 gap-3 border-white'>
                                            <div className='gap-3 mt-2 flex mx-2'>
                                                <a href={item.site} target='_blank'>{item.site}</a>
                                                <span onClick={() => copytext(item.site)}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/lyrrgrsl.json"
                                                        trigger="hover">
                                                    </lord-icon>
                                                </span>
                                            </div>
                                        </td>
                                        <td className='w-32 border-2 gap-3 border-white'>
                                            <div className='gap-3 mt-2 flex mx-2 cursor-pointer'>
                                                <span onClick={() => copytext(item.username)}>
                                                    {item.username}
                                                </span>
                                                <span onClick={() => copytext(item.username)}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/lyrrgrsl.json"
                                                        trigger="hover">
                                                    </lord-icon>
                                                </span>
                                            </div>
                                        </td>
                                        <td className='w-32 border-2 gap-3 border-white'>
                                            <div className='gap-3 mt-2 flex mx-2 cursor-pointer'>
                                                <span onClick={() => copytext(item.password)}>
                                                   <b> {"*".repeat(item.password.length)}</b>
                                                </span>
                                                <span onClick={() => copytext(item.password)}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/lyrrgrsl.json"
                                                        trigger="hover">
                                                    </lord-icon>
                                                </span>
                                            </div>
                                        </td>
                                        <td className='w-32 border-2 gap-3 border-white'>
                                            <div className='gap-3 mt-2 flex mx-8'>
                                                <span className="cursor-pointer" onClick={() => deletepassword(item.id)}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/wpyrrmcq.json"
                                                        trigger="hover">
                                                    </lord-icon>
                                                </span>
                                                <span className='cursor-pointer' onClick={() => editpassword(item.id)}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/vysppwvq.json"
                                                        trigger="hover">
                                                    </lord-icon>
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                }
            </div>
        </>
    );
};

export default Manager;