// import { useState } from 'react';
// import AuthorJoin from './AuthorJoin';
// import BookJoin from './BookJoin';

// interface FormData {
//   bookId: string | undefined,
//   authorIds: string[] | undefined,
// }

// export default function JoinTool() {
//   const [formData, setFormData] = useState<FormData>({bookId: undefined, authorIds: undefined});

//   async function joinBookAuthor() {
//     try {
//       const response = await fetch('/api/join', {
//         method: 'POST',
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) {
//           throw new Error('Invalid response, check network tab.');
//       }

//       return response;
//     } catch (error) {
//       console.error('error from joinBookAuthor():', error);
//     }
//   }

//   return (
//     <div className='container'>
//       <main>
//           <button
//             onClick={joinBookAuthor}
//             className='border-1 rounded p-2 m-5'
//           >
//             Join
//           </button>
//           <div className='flex'>
//             <BookJoin onChange={(id) => setFormData({ ...formData, bookId: id })}/>
//             <AuthorJoin onChange={(ids) => {
//               if (formData.authorIds?.length) {
//                 setFormData({ ...formData, authorIds: ids
//                 });
//               } else {
//                 setFormData({ ...formData, authorIds: ids
//                 });
//               }
//               }}/>
//           </div>
//       </main>
//     </div>
//   )
// }
