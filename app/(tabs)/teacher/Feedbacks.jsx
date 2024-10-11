import React, { useEffect, useState } from 'react'; 
import { StyleSheet, Text, View, FlatList, ActivityIndicator, ScrollView, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from "../../configs/FirebaseConfig";

const Feedbacks = ({ navigation }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const feedbacksCollection = collection(db, 'ratings'); // Change 'feedbacks' to your actual Firestore collection name
        const feedbacksSnapshot = await getDocs(feedbacksCollection);
        const feedbacksList = feedbacksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFeedbacks(feedbacksList);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  const deleteFeedback = async (id) => {
    try {
      await deleteDoc(doc(db, 'ratings', id)); // Change 'feedbacks' to your actual Firestore collection name
      setFeedbacks((prevFeedbacks) => prevFeedbacks.filter((feedback) => feedback.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0C5481" />;
  }

  if (error) {
    return <Text style={styles.errorText}>Error fetching feedbacks: {error}</Text>;
  }

  return (
    <ImageBackground
      source={require('../../assets/teacherbackground.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.fixedHeader}>
        <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('TeacherHome')}>
            <Text style={styles.backButton}>
              <Feather name="arrow-left-circle" size={24} color="black" />
            </Text>
          </TouchableOpacity>
        </View>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.afterHeaderImage}
        />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Feedbacks</Text>
        <FlatList
          data={feedbacks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.feedbackItem}>
              <Text style={styles.feedbackText}>Rating: {item.rating}</Text>
              <Text style={styles.feedbackText}>Feedback: {item.feedback}</Text>
              <TouchableOpacity onPress={() => deleteFeedback(item.id)}>
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        />
        <Image
          source={require('../../assets/pinkbird.png')}
          style={styles.birdImage}
        />
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: 
  { 
    flex: 1, 
    justifyContent: 'center' 
  },
  fixedHeader: 
  { 
    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0, 
    zIndex: 1, 
    backgroundColor: '#fff', 
    height: 49 
  },
  headerContainer: 
  { 
    padding: 13, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  backButton: 
  { 
    fontSize: 18, 
    color: 'black' 
  },
  afterHeaderImage: 
  { 
    width: '100%', 
    height: 110, 
    resizeMode: 'cover' 
  },
  scrollContainer: 
  { 
    paddingTop: 60, 
    paddingBottom: 150, 
    alignItems: 'center', 
    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
    borderRadius: 15, 
    marginHorizontal: 20, 
    elevation: 4, 
    marginTop: 200 
  },
  title: 
  { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    textAlign: 'center' 
  },
  feedbackItem: 
  { 
    padding: 10, 
    marginBottom: 10, 
    backgroundColor: '#f9f9f9', 
    borderRadius: 5, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 3, 
    elevation: 3, 
    width: '90%' 
  },
  feedbackText: 
  { 
    fontSize: 16, 
    color: '#333' 
  },
  deleteText: 
  { 
    color: 'red', 
    fontSize: 14, 
    marginTop: 5 
  },
  errorText: 
  { 
    color: 'red', 
    textAlign: 'center', 
    marginTop: 10 
  },
  birdImage: 
  { 
    width: 110, 
    height: 110, 
    alignSelf: 'flex-end', 
    marginTop: 9 
  },
});

export default Feedbacks;














// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getFirestore, collection, getDocs, deleteDoc, doc } from "firebase/firestore";
// import React, { useEffect, useState } from 'react'; 
// import { StyleSheet, Text, View, FlatList, ActivityIndicator, ScrollView, ImageBackground, TouchableOpacity, Image } from 'react-native';
// import { Feather } from '@expo/vector-icons';
// import { db } from "../../configs/FirebaseConfig";
// // Your web app's Firebase configuration
// // const firebaseConfig = {
// //   apiKey: "AIzaSyDjHbtZNNuTIilya684ncVEvI04I16DgjU",
// //   authDomain: "daycare-b8e35.firebaseapp.com",
// //   projectId: "daycare-b8e35",
// //   storageBucket: "daycare-b8e35.appspot.com",
// //   messagingSenderId: "77829676340",
// //   appId: "1:77829676340:web:cd5aece85a79dfc026d961",
// //   measurementId: "G-M36FBW4NYK"
// // };

// // // Initialize Firebase
// // const app = initializeApp(firebaseConfig);
// // const db = getFirestore(app);

// const Feedbacks = ({ navigation }) => {
//   const [feedbacks, setFeedbacks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchFeedbacks = async () => {
//       try {
//         const feedbacksCollection = collection(db, 'ratings'); // Change 'feedbacks' to your actual Firestore collection name
//         const feedbacksSnapshot = await getDocs(feedbacksCollection);
//         const feedbacksList = feedbacksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         setFeedbacks(feedbacksList);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFeedbacks();
//   }, []);

//   const deleteFeedback = async (id) => {
//     try {
//       await deleteDoc(doc(db, 'ratings', id)); // Change 'feedbacks' to your actual Firestore collection name
//       setFeedbacks((prevFeedbacks) => prevFeedbacks.filter((feedback) => feedback.id !== id));
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   if (loading) {
//     return <ActivityIndicator size="large" color="#0C5481" />;
//   }

//   if (error) {
//     return <Text style={styles.errorText}>Error fetching feedbacks: {error}</Text>;
//   }

//   return (
//     <ImageBackground
//       source={require('../../assets/teacherbackground.png')}
//       style={styles.background}
//       resizeMode="cover"
//     >
//       <View style={styles.fixedHeader}>
//         <View style={styles.headerContainer}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Text style={styles.backButton}>
//               <Feather name="arrow-left-circle" size={24} color="black" />
//             </Text>
//           </TouchableOpacity>
//         </View>
//         <Image
//           source={require('../../assets/logo.png')}
//           style={styles.afterHeaderImage}
//         />
//       </View>

//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         <View style={styles.container}>
//           <Text style={styles.title}>User Feedbacks</Text>
//           <FlatList
//             data={feedbacks}
//             keyExtractor={(item) => item.id}
//             renderItem={({ item }) => (
//               <View style={styles.feedbackItem}>
//                 <Text style={styles.feedbackRating}>Rating: {item.rating} / 5</Text>
//                 <Text style={styles.feedbackText}>{item.feedback}</Text>
//                 {/* Display the title if it exists */}
//                 {item.teacherActivity && item.teacherActivity.title && (
//                   <Text style={styles.feedbackTitle}>Title: {item.teacherActivity.title}</Text>
//                 )}
//                 <TouchableOpacity style={styles.deleteButton} onPress={() => deleteFeedback(item.id)}>
//                   <Text style={styles.deleteButtonText}>Delete</Text>
//                 </TouchableOpacity>
//               </View>
//             )}
//             contentContainerStyle={styles.listContainer}
//           />
//           <Image
//             source={require('../../assets/pinkbird.png')}
//             style={styles.birdImage}
//           />
//         </View>
//       </ScrollView>
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//   },
//   fixedHeader: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     zIndex: 1,
//     backgroundColor: '#fff',
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 2,
//     height: 49,
//   },
//   headerContainer: {
//     padding: 13,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   backButton: {
//     fontSize: 18,
//     color: 'black',
//   },
//   afterHeaderImage: {
//     width: '100%',
//     height: 110,
//     resizeMode: 'cover',
//   },
//   scrollContainer: {
//     paddingTop: 200,
//     paddingBottom: 30,
//   },
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: 'rgba(255, 255, 255, 0.9)',
//     borderRadius: 10,
//     marginHorizontal: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//     elevation: 5,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//     color: '#0C5481',
//   },
//   feedbackItem: {
//     padding: 15,
//     marginBottom: 10,
//     borderRadius: 8,
//     backgroundColor: 'rgba(255, 255, 255, 0.8)',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   feedbackRating: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#0C5481',
//   },
//   feedbackText: {
//     fontSize: 16,
//     color: '#555',
//   },
//   feedbackTitle: {
//     fontSize: 16,
//     fontStyle: 'italic',
//     color: '#333',
//     marginTop: 5,
//   },
//   deleteButton: {
//     width: 150,
//     marginTop: 10,
//     padding: 10,
//     backgroundColor: '#0C5481',
//     borderRadius: 5,
//     alignItems: 'center',
//     alignSelf: 'center',  
//   },
//   deleteButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   errorText: {
//     color: 'red',
//     textAlign: 'center',
//     marginTop: 20,
//   },
//   birdImage: {
//     width: 110,
//     height: 110,
//     alignSelf: 'flex-end',
//     marginTop: 9,
//   },
// });

// export default Feedbacks;
