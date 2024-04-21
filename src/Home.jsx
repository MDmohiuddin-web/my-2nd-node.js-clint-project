import { useEffect, useState } from "react";

const Home = () => {
  const [data, setdata] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3030/user")
      .then((res) => res.json())
      .then((data) => setdata(data));
  }, []);

  const usersubmit = (e) => {
    // e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const deferment = form.deferment.value;
    // console.log(name, email, deferment);
    const user = { name, email, deferment };
    console.log(user);
    fetch("http://localhost:3030/user", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(user),
    })
    .then(res=>res.json())
    .then(data=>{
        console.log('inside post',data)
        // form.reset()
        const newuser=[...user,data]
        setdata(newuser)
    })
  };

  return (
    <div className="p-5  min-h-svh w-4/5 m-auto capitalize">
      <h4 className="text-center">this is home page </h4>
      <h4>user length : {data.length}</h4>
      {/*  */}
      <form onSubmit={usersubmit} className=" my-2 bg-gray-100 p-2 text-center">
        <input
          className="my-1 rounded"  required
          name="name"
          type="text"
          placeholder="name"
        />
        <br />
        <input
          className="my-1 rounded" required
          name="email"
          type="email"
          placeholder="email"
        />
        <br />
        <input
          className="my-1 rounded" required
          name="deferment"
          type="text"
          placeholder="deferment"
        />
        <br />
        <button className="btn btn-primary">add user</button>
      </form>

      {/*  */}
      <div className="bg-purple-300 py-5 ">
        <ul>
          {data.map((item) => (
            <div key={item.id} className="bg-green-200 my-5 p-2">
              <li>{item.name}</li>
              <li>{item.email}</li>
              <li>{item.deferment}</li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
