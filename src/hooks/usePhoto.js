import { useRef, useState  } from "react";
import { storage } from '../firebase/initFirebase'; 
import { ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';
import { v4 } from "uuid"
import { useUser } from "./useUser";

export default function usePhoto() {
    const { user } = useUser();
    const selectedImgRef = useRef(null);
    const [imageUrls, setImageUrls] = useState([]);

    const handleImgChange = (event) => {
        console.log('File selected');
        if (event.target.files[0]) {
            selectedImgRef.current = event.target.files[0];
          }
        };

    const uploadImg = () => {
        const imgFile = selectedImgRef.current;
        if (!imgFile) return;
        if (!user || !user.uid) return console.log('No user ID available');
        const imgRef = ref(storage, `${user.uid}/${imgFile.name + v4()}`);

        uploadBytes(imgRef, imgFile)
          .then(() => {
            console.log('Image uploaded');
            getDownloadURL(imgRef)
              .then((url) => {
                console.log('Download URL:', url);
              })
              .catch((error) => {
                console.log(error);
                alert('Failed to get the download URL');
              });
          })
          .catch((error) => {
            console.log(error);
            alert('Image upload failed');
          });
      };

    const getImagesFromStorage = () => {
      const imagesRef = ref(storage, user.uid);
      listAll(imagesRef)
        .then((res) => {
          const imagePromises = res.items.map((item) => getDownloadURL(item));
          Promise.all(imagePromises)
            .then((urls) => {
              setImageUrls(urls);
            })
            .catch((error) => {
              console.log(error);
              alert('Failed to get image URLs');
            });
        })
        .catch((error) => {
          console.log(error);
          alert('Failed to list images');
        });
    };
      
  return { selectedImgRef, uploadImg, handleImgChange, getImagesFromStorage, imageUrls }
}