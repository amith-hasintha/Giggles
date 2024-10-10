import React, { useState } from 'react'; 
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, ScrollView, TextInput } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Slider from '@react-native-community/slider'; // Importing the slider component
import { collection, addDoc } from 'firebase/firestore'; // Firestore imports
import { db } from '../../configs/FirebaseConfig';

const Ratings = () => {
  const navigation = useNavigation();
  const [rating, setRating] = useState(0); // State for rating
  const [feedback, setFeedback] = useState(''); // State for feedback

  const handleSubmit = async () => {
    try {
      await addDoc(collection(db, 'ratings'), {
        rating: rating,
        feedback: feedback,
        timestamp: new Date(),
      });

      // Reset states after submission
      setRating(0);
      setFeedback('');

      alert('Thank you for your feedback!');
      navigation.navigate('ParentHome'); // Navigate after submission
    } catch (error) {
      console.error('Error submitting rating:', error);
      alert('There was an error submitting your feedback. Please try again.');
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/transparentpic.png')}
      style={styles.rbackground}
      resizeMode="cover"
    >
      <View style={styles.rcontainer}>
        <View style={styles.rfixedHeader}>
        <View style={styles.rheaderContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('DisplayParentHomework')}>
                        <Text style={styles.rbackButton}>
                            <Feather name="arrow-left-circle" size={24} color="black" />
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('ParentHomePage')}>
                        <Ionicons name="menu" size={24} color="black" />
                    </TouchableOpacity>
                </View>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.rafterHeaderImage}
          />
        </View>

        <ScrollView
          contentContainerStyle={styles.rscrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.rratingsContainer}>
            <Text style={styles.rratingsTitle}>Rate Your Experience:</Text>
            <View style={styles.rsliderContainer}>
              <Slider
                style={styles.rslider}
                minimumValue={0}
                maximumValue={5}
                step={0.5}
                value={rating}
                onValueChange={setRating}
                minimumTrackTintColor="#0C5481"
                maximumTrackTintColor="#ccc"
                thumbTintColor="#FFD700"
              />
              <Text style={styles.rsliderValue}>{rating.toFixed(1)} / 5</Text>
            </View>
          </View>

          <View style={styles.rfeedbackContainer}>
            <Text style={styles.rfeedbackTitle}>Additional Feedback:</Text>
            <Text style={styles.rfeedbackText}>
              Your feedback is valuable to us. Please share your thoughts about our service.
            </Text>
            <TextInput
              style={styles.rfeedbackInput}
              placeholder="Type your feedback here..."
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              value={feedback}
              onChangeText={setFeedback}
            />
          </View>

          <TouchableOpacity style={styles.rsubmitButton} onPress={handleSubmit}>
            <Text style={styles.rsubmitButtonText}>Submit</Text>
          </TouchableOpacity>
          <Image
          source={require('../../assets/pinkbird.png')}
          style={styles.rbirdImage}
        />
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  rcontainer: 
  { 
    flex: 1 
  },
  rbackground: 
  { flex: 1, 
    justifyContent: 'center', 
    backgroundColor: '#96CBE9' 
  },
  rfixedHeader: 
  { 
    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0, 
    zIndex: 1, 
    backgroundColor: '#fff', 
    height: 49 
  },
  rheaderContainer: 
  { 
    padding: 13, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  rbackButton: 
  { 
    fontSize: 18, 
    color: 'black' 
  },
  rafterHeaderImage: 
  { width: '100%', 
    height: 110, 
    resizeMode: 'cover' 
  },
  rscrollContainer: 
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
  rratingsContainer: 
  { 
    flexDirection: 'column', 
    alignItems: 'center', 
    marginBottom: 20, 
    paddingHorizontal: 20, 
    paddingVertical: 15, 
    backgroundColor: '#f0f8ff', 
    borderRadius: 10, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 3, 
    elevation: 3, 
    width: '90%' 
  },
  rratingsTitle: 
  { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#333', 
    marginBottom: 10, 
    textAlign: 'center' 
  },
  rsliderContainer: 
  { 
    width: '100%', 
    alignItems: 'center' 
  },
  rslider: 
  { 
    width: '90%', 
    height: 40 
  },
  rsliderValue: 
  { 
    fontSize: 18, 
    color: '#0C5481', 
    marginTop: 5 
  },
  rfeedbackContainer: 
  { 
    marginTop: 20, 
    padding: 15, 
    backgroundColor: '#f9f9f9', 
    borderRadius: 10, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 1 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 1, 
    width: '90%', 
    marginBottom: 20 
  },
  rfeedbackTitle: 
  { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 5 
  },
  rfeedbackText: 
  { 
    fontSize: 16, 
    color: '#555' 
  },
  rfeedbackInput: 
  { 
    borderColor: '#ccc', 
    borderWidth: 1, 
    borderRadius: 10, 
    padding: 10, 
    marginTop: 10, 
    height: 100, 
    backgroundColor: '#fff', 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 1 }, 
    shadowOpacity: 0.2, shadowRadius: 1 
  },
  rsubmitButton: 
  { 
    marginTop: 20, 
    backgroundColor: '#0C5481', 
    borderRadius: 10, 
    paddingVertical: 15, 
    paddingHorizontal: 30, 
    alignItems: 'center', 
    elevation: 3 
  },
  rsubmitButtonText: 
  { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
  rbirdImage: 
  { 
    width: 110, 
    height: 110, 
    alignSelf: 'flex-end', 
    marginTop: 9 
  },
});

export default Ratings;
































// import React, { useState } from 'react'; 
// import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, ScrollView, TextInput } from 'react-native';
// import { Feather, Ionicons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';
// import Slider from '@react-native-community/slider'; // Importing the slider component
// import { collection, addDoc } from 'firebase/firestore'; // Firestore imports
// import { db } from '../../configs/FirebaseConfig';

// const Ratings = () => {
//   const navigation = useNavigation();
//   const [rating, setRating] = useState(0); // State for rating
//   const [feedback, setFeedback] = useState(''); // State for feedback

//   const handleSubmit = async () => {
//     // Submitting data to Firestore
//     try {
//       await addDoc(collection(db, 'ratings'), {
//         rating: rating,
//         feedback: feedback,
//         timestamp: new Date(), // Add timestamp for sorting/filtering
//       });

//       // Reset states after submission
//       setRating(0);
//       setFeedback('');

//       // Navigate to ParentHome.js after successful submission
//       alert('Thank you for your feedback!');
//       navigation.navigate('ParentHome');
//     } catch (error) {
//       console.error('Error submitting rating:', error); // Log error for debugging
//       alert('There was an error submitting your feedback. Please try again.'); // Show error message
//     }
//   };

//   return (
//     <ImageBackground
//       source={require('../../assets/transparentpic.png')}
//       style={styles.background}
//       resizeMode="cover"
//     >
//       <View style={styles.container}>
//         <View style={styles.fixedHeader}>
//           <View style={styles.headerContainer}>
//             <TouchableOpacity onPress={() => navigation.goBack()}>
//               <Text style={styles.backButton}>
//                 <Feather name="arrow-left-circle" size={24} color="black" />
//               </Text>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => console.log('Menu pressed')}>
//               <Ionicons name="menu" size={24} color="black" />
//             </TouchableOpacity>
//           </View>
//           <Image
//             source={require('../../assets/logo.png')}
//             style={styles.afterHeaderImage}
//           />
//         </View>

//         <ScrollView
//           contentContainerStyle={styles.scrollContainer}
//           showsVerticalScrollIndicator={false}
//         >
//           <View style={styles.ratingsContainer}>
//             <Text style={styles.ratingsTitle}>Rate Your Experience:</Text>
//             <View style={styles.sliderContainer}>
//               <Slider
//                 style={styles.slider}
//                 minimumValue={0}
//                 maximumValue={5}
//                 step={0.5}
//                 value={rating}
//                 onValueChange={setRating}
//                 minimumTrackTintColor="#0C5481"
//                 maximumTrackTintColor="#ccc"
//                 thumbTintColor="#FFD700"
//               />
//               <Text style={styles.sliderValue}>{rating.toFixed(1)} / 5</Text>
//             </View>
//           </View>

//           <View style={styles.feedbackContainer}>
//             <Text style={styles.feedbackTitle}>Additional Feedback:</Text>
//             <Text style={styles.feedbackText}>
//               Your feedback is valuable to us. Please share your thoughts about our service.
//             </Text>
//             <TextInput
//               style={styles.feedbackInput}
//               placeholder="Type your feedback here..."
//               multiline
//               numberOfLines={4}
//               textAlignVertical="top"
//               value={feedback}
//               onChangeText={setFeedback}
//             />
//           </View>

//           <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
//             <Text style={styles.submitButtonText}>Submit</Text>
//           </TouchableOpacity>
//           <Image
//           source={require('../../assets/pinkbird.png')}
//           style={styles.birdImage}
//         />
//         </ScrollView>
//       </View>
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   background: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: '#96CBE9',
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
//     paddingTop: 60,
//     paddingBottom: 150,
//     alignItems: 'center',
//     backgroundColor: 'rgba(255, 255, 255, 0.9)',
//     borderRadius: 15,
//     marginHorizontal: 20,
//     elevation: 4,
//     marginTop: 200,
//   },
//   ratingsContainer: {
//     flexDirection: 'column',
//     alignItems: 'center',
//     marginBottom: 20,
//     paddingHorizontal: 20,
//     paddingVertical: 15,
//     backgroundColor: '#f0f8ff',
//     borderRadius: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 3,
//     width: '90%',
//   },
//   ratingsTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   sliderContainer: {
//     width: '100%',
//     alignItems: 'center',
//   },
//   slider: {
//     width: '90%',
//     height: 40,
//   },
//   sliderValue: {
//     fontSize: 18,
//     color: '#0C5481',
//     marginTop: 5,
//   },
//   feedbackContainer: {
//     marginTop: 20,
//     padding: 15,
//     backgroundColor: '#f9f9f9',
//     borderRadius: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.2,
//     shadowRadius: 1,
//     width: '90%',
//     marginBottom: 20,
//   },
//   feedbackTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   feedbackText: {
//     fontSize: 16,
//     color: '#555',
//   },
//   feedbackInput: {
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 10,
//     padding: 10,
//     marginTop: 10,
//     height: 100,
//     backgroundColor: '#fff',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.2,
//     shadowRadius: 1,
//   },
//   submitButton: {
//     marginTop: 20,
//     backgroundColor: '#0C5481',
//     borderRadius: 10,
//     paddingVertical: 15,
//     paddingHorizontal: 30,
//     alignItems: 'center',
//     elevation: 3,
//   },
//   submitButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   birdImage: {
//     width: 110,
//     height: 110,
//     alignSelf: 'flex-end',
//     marginTop: 9,
//   },
// });

// export default Ratings;
