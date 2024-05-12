'use server'

export async function getFaceActions() {
  const promise = new Promise((r) =>
    setTimeout(r, 1000, ['quay phai', 'quay trai', 'mim cuoi']),
  )

  return await promise
}
