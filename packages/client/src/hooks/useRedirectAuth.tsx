export const useRedirectAuth = async (path: string) => {
  if (Cookies.get('accessToken')) {
    try {
      await dispatch(fetchCheckAuth()).unwrap()

      push(path)

      return
    } catch (error) {
      setIsShowModal(true)
    }
  } else {
    setIsShowModal(true)
  }

  return [state, toggle]
}
