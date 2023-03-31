  // Handle modal
export const toggleModal = (
  setModalVisible,
  isModalVisible,
  setZoomItem,
  setCampaignInfo,
  itemImage,
  item
) => {
    setModalVisible(!isModalVisible);
    if (isModalVisible !== true) {
      setZoomItem([{
        url:itemImage ,
        props: {}
      }])
      setCampaignInfo(item)
      
    }
  };