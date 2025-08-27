const useTransactionList = () => {
  return {
    data: Array.from({ length: 10 }),
    isEmpty: false,
  }
}

export default useTransactionList
