import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  Platform,
} from "react-native";
import { Colors } from "../../utils/Colors";
import TabPageLayout from "../../layout/tabPageLayout";
import { useEffect, useState, useContext } from "react";
import { PostPreviewModal } from "../../components/shared/postPreviewModal";
import { SmallCard } from "../../components/feed/smallCard";
import { useDispatch, useSelector } from "react-redux";
import { CredentialContext } from "../../store/CredentialContext";
import { db } from "../../firebase";
import {
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
  orderBy,
  deleteDoc,
} from "firebase/firestore";

export const Feed = () => {
  const dispatch = useDispatch();
  const { shares } = useSelector((state) => state.shared);
  const { ads } = useSelector((state) => state.ads);
  const { storedCredentials } = useContext(CredentialContext);
  const [isModalVisible, setModalVisible] = useState(false);
  const [zoomItem, setZoomItem] = useState(null);
  const [campaignInfo, setCampaignInfo] = useState(null);

  console.log(ads);

  // Get shared
  const getShared = async () => {
    try {
      const q = query(
        collection(db, "shares"),
        where("sharerId", "==", storedCredentials),
        orderBy("timeStamp", "desc")
      );
      onSnapshot(q, (querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          return data.push({ id: doc.id, ...doc.data() });
        });
        console.log(data);
        //  setAdsTemp(data)
      });

      console.log(storedCredentials);
    } catch (err) {
      console.log(err);
    }
  };
  // Handle modal
  const toggleModal = (itemImage, item) => {
    setModalVisible(!isModalVisible);
    if (isModalVisible !== true) {
      console.log(isModalVisible);
      setZoomItem([
        {
          url: "https://firebasestorage.googleapis.com/v0/b/movads-86100.appspot.com/o/16644737528081%20(2).jpg?alt=media&token=c5c8ae1c-b26e-48b3-b30d-b126e8cca6d9",
          props: {},
        },
      ]);
      setCampaignInfo(item);
    }
  };

  useEffect(() => {
    getShared();
  }, []);
  return (
    <TabPageLayout
      barStyle={"dark-content"}
      statusColor={Colors.white}
      backgroundColor={Colors.white}
      title={"Timeline"}
      mainBg={Colors.offWhite}
    >
      <SmallCard toggleModal={toggleModal} />
      <SmallCard toggleModal={toggleModal} />
      <SmallCard toggleModal={toggleModal} />
      <SmallCard toggleModal={toggleModal} />
      <SmallCard toggleModal={toggleModal} />

      <PostPreviewModal
        isModalVisible={isModalVisible}
        toggleModal={toggleModal}
        zoomItem={zoomItem}
        setZoomItem={setZoomItem}
      />
    </TabPageLayout>
  );
};
