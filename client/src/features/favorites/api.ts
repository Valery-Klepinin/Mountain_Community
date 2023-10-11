// export async function addFavorites(trackId: number): Promise<any> {
//   const res = await fetch(`/api/tracks/favorites`, {
//     method: 'POST',
//     body: JSON.stringify({ trackId }),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
//   return await res.json();
// }

export async function toggleFavorites(trackId: number): Promise<any> {
  const res = await fetch(`/api/tracks/favorites/${trackId}`, {
    method: 'PUT',
    body: JSON.stringify({ trackId }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  console.log(data, 'fetch');

  return data;
}

export async function requestFavorites(): Promise<any> {
  const res = await fetch(`/api/tracks/favorites`);
  return await res.json();
}

// export async function removeFavorites(trackId: number): Promise<any> {
//   const res = await fetch(`/api/tracks/favorites/${trackId}`, {
//     method: 'DELETE',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
//   if (res.ok) {
//     return { success: true };
//   } else {
//     const errorData = await res.json();
//     throw new Error(errorData.message);
//   }
// }
