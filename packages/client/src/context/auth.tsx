export { }
// import { createContext, useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import { AuthService } from 'src/api';

// const AuthContext = createContext({});

// interface Props {
//   children: React.ReactNode
// }

// export const AuthProvider = ({ children }: Props) => {
//   const [user, setUser] = useState<null | string>('');
//   const [isError, setIsError] = useState<null | boolean>(null);
//   const [isLoading, setIsLoading] = useState<null | boolean>(null);
//   const [initialLoading, setInitialLoading] = useState(true);

//   const router = useRouter();


//   const login = async ({ email, password }) => {
//     setIsLoading(true);

//     const data = AuthService.login({ email, password })

//     if (res.ok) {
//       setUser(data);
//       router.push('/');
//     } else {
//       setIsLoading(false);
//       setIsError(data.message);
//       setIsError(null);
//     }
//   };

//   const checkUserLoggedIn = async () => {
//     setInitialLoading(true);

//     const res = await fetch(`http://localhost:3001/api/user`);
//     const data = await res.json();

//     if (res.ok) {
//       setUser(data.user.data.user);
//     } else {
//       setUser(null);
//     }
//   };

//   const logout = async () => {
//     fetch(`http://localhost:3001/api/logout`, {
//       method: 'POST',
//     })
//       .then((res) => {
//         setUser(null);
//         router.push('/login');
//       })
//       .catch((error) => {
//         console.error('error logging out user');
//       });
//   };

//   useEffect(() => checkUserLoggedIn(), []);


//   return (
//     <AuthContext.Provider value={{ user, isError, isLoading, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;
