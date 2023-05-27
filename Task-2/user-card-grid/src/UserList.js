// import React, { useEffect, useState } from 'react';

// const UserList = () => {
//   const [userData, setUserData] = useState([]);

//   useEffect(() => {
//     const storedData = localStorage.getItem('userData');
//     if (storedData) {
//       setUserData(JSON.parse(storedData));
//     }
//   }, []);

//   return (
//     <div>
//       <h1>User List</h1>
//       {userData.map((user) => (
//         <div className="user-card" key={user.id}>
//           <img src={user.avatar} alt="User Avatar" />
//           <h3>{user.first_name} {user.last_name}</h3>
//           <p>{user.email}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default UserList;
