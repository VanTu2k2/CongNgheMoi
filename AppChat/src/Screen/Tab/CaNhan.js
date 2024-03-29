import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { Alert, StyleSheet, View, Text, Pressable, Image, TextInput} from "react-native";
import { auth } from "../../../config/firebase";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";


const CaNhan = () => {
  const navigation = useNavigation();
  const firestore = getFirestore();
  const [displayName, setDisplayName] = useState('');
  const [photoURL, setPhotoURL] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setDisplayName(user.displayName);
        fetchPhotoURL(user.uid);
      } else {
        setDisplayName('');
        setPhotoURL(null);
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    // Cập nhật lại ảnh đại diện khi quay lại từ trang Profile
    const unsubscribe = navigation.addListener('focus', () => {
      // Fetch ảnh đại diện mới từ Firestore hoặc từ state nếu đã cập nhật
      if (auth.currentUser) {
        fetchPhotoURL(auth.currentUser.uid);
      }
    });

    return unsubscribe;
  }, [navigation]);

  // Method hiện thị ảnh cá nhân
  const fetchPhotoURL = async (userId) => {
    try {
      const userRef = doc(firestore, 'users', userId);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        setPhotoURL(userData.photoURL);
      }
    } catch (error) {
      console.error("Error fetching photo URL: ", error);
    }
  };

  const handleSetting = () => {
    navigation.navigate('CaiDat');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Icon name="search" size={25} color="white" style={styles.icon} />
          <TextInput style={styles.textTK} placeholder="Tìm kiếm"></TextInput>
        </View>
        <Pressable style={styles.iconContainer2} onPress={handleSetting}>
          <Icon name="settings-outline" size={25} color="white" style={styles.icon} />
        </Pressable>
      </View>
      
      {/* Body */}
      <View style={styles.body}>
        <Pressable
          style={styles.userContainer}
          //onPress={() => navigation.navigate('Profile')}>
          onPress={() => navigation.navigate('ThongTinUser')}>
          {photoURL ? (
          <Image source={{ uri: photoURL }} style={styles.imgdaidien} />
          ) : (
            <Text>No avatar</Text>
          )}

          <View style={styles.userInfo}>
            <Text style={styles.userName}>{displayName}</Text>
            <Text style={styles.userMessage}>Xem trang cá nhân</Text>
          </View>
        </Pressable>

        {/* thanh cắt ngang */}
        <View style={styles.separator} />

        <Pressable
          style={styles.userContainer}
          onPress={() => navigation.navigate('UserProfile')}
        >
          <Icon
            name="musical-notes-outline"
            size={45}
            color="blue"
            style={styles.userIcon}
          />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Nhạc chờ</Text>
            <Text style={styles.userMessage}>Đăng ký nhạc chờ, thể hiện cá tính</Text>
          </View>
        </Pressable>

        <Pressable
          style={styles.userContainer}
          onPress={() => navigation.navigate('UserProfile')}
        >
          <Icon
            name="qr-code-outline"
            size={45}
            color="blue"
            style={styles.userIcon}
          />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Ví QR</Text>
            <Text style={styles.userMessage}>Lưu trữ và xuất trình các mã QR quan trọng</Text>
          </View>
        </Pressable>

        <Pressable
          style={styles.userContainer}
          onPress={() => navigation.navigate('UserProfile')}
        >
          <Icon
            name="cloud-outline"
            size={45}
            color="blue"
            style={styles.userIcon}
          />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Cloud của tôi</Text>
            <Text style={styles.userMessage}>Lưu trữ các tin nhắn quan trọng</Text>
          </View>
        </Pressable>

        {/* thanh cắt ngang */}
        <View style={styles.separator} /> 

        <Pressable
          style={styles.userContainer}
          onPress={() => navigation.navigate('UserProfile')}
        >
          <Icon
            name="pie-chart-outline"
            size={45}
            color="blue"
            style={styles.userIcon}
          />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Dung lượng và dữ liệu</Text>
            <Text style={styles.userMessage}>Quản lý dữ liệu của bạn</Text>
          </View>
        </Pressable>

        {/* thanh cắt ngang */}
        <View style={styles.separator} /> 

        <Pressable
          style={styles.userContainer}
          onPress={() => navigation.navigate('UserProfile')}
        >
          <Icon
            name="key"
            size={45}
            color="blue"
            style={styles.userIcon}
          />
          <View style={styles.userInfo1}>
            <Text style={styles.userName}>Tài khoản và bảo mật</Text>
          </View>
        </Pressable>

        <Pressable
          style={styles.userContainer}
          onPress={() => navigation.navigate('UserProfile')}
        >
          <Icon
            name="lock-closed-outline"
            size={45}
            color="blue"
            style={styles.userIcon}
          />
          <View style={styles.userInfo1}>
            <Text style={styles.userName}>Quyền riêng tư</Text>
          </View>
        </Pressable>

      </View>
      
      {/* Footer */}
      <View style={styles.footer}>
        
      </View>

    </View>
  );
};

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 35,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#66E86B",
      paddingVertical: 20,
      justifyContent: 'space-between',
    },
    iconContainer: {
      marginLeft: 5,
      flexDirection: 'row',
    },
    textTK: {
      marginLeft: 5,
      fontSize: 18,
      color: 'white',
      width: 250,
    },
    iconContainer2: {
      marginRight: 15,
      flexDirection: 'row',
    },
    body: {
      flex: 1,
      paddingHorizontal: 10,
    },
    userContainer: {
      flexDirection: 'row',
      paddingHorizontal: 5,
      paddingVertical: 10,
    },
    imgdaidien: {
      width: 60,
      height: 60,
      borderRadius: 40,
    },
    userIcon: {
      marginRight: 10,
    },
    userInfo: {
      flex: 1,
      marginLeft: 10,
      marginTop: 5,
    },
    userName: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    userMessage: {
      fontSize: 15,
      color: 'gray',
    },
    userInfo1: {
      flex: 1,
      marginLeft: 10,
      marginTop: 12,
    },
    // thanh cắt ngang
    separator: {
      height: 5, // Độ cao của thanh phân cách
      backgroundColor: '#ccc',
      marginVertical: 5, // Khoảng cách dọc giữa các phần
    },
    footer: {
      justifyContent: "flex-end",
      alignItems: "center",
      marginBottom: 20,
    },
});
export default CaNhan;