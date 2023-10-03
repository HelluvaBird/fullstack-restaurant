export default function page() {
  return null;
}

// export default async function MenuPage() {
//   const categories: Category[] = await getCategories();
//   return (
//     <div className="flex-1 p-4 flex justify-center">
//       <div className="w-full max-w-7xl flex flex-col md:flex-row items-center">
//         {categories.map((category) => (
//           <Link
//             key={category.id}
//             href={`/menu/${category.slug}`}
//             className="w-full h-[500px] bg-cover bg-right p-8 md:h-[600px] relative group"
//             style={{ backgroundImage: `url(${category.img})` }}
//           >
//             <div className="absolute inset-0 p-8 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity">
//               <div className={`w-1/2 text-white`}>
//                 <h2 className="uppercase font-bold text-3xl">
//                   {category.title}
//                 </h2>
//                 <p className="text-sm my-8">{category.description}</p>
//                 <button
//                   type="button"
//                   className={`hidden 2xl:block text-${
//                     category.color === 'black' ? 'white' : 'red-500'
//                   } py-2 px-4 rounded-md`}
//                   style={{ backgroundColor: category.color }}
//                 >
//                   Explore
//                 </button>
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }
