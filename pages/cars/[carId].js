import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import Layout from '../../components/Layout';
import {useDispatch, useSelector} from "react-redux";
import { getUrlforFetchData } from '../../store/carStore';
import {MongoClient} from 'mongodb';
import FileBase64 from 'react-file-base64';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";


function CarId(props) {  
   
    
    const popUpEditeDataState = useSelector((state) => state.carSlice.currentUrlFd);  
    console.log(popUpEditeDataState + " use Selector")

    const router = useRouter();
    const currentUrlis = router.query.carId;
    

    const dispatch = useDispatch(); 
    dispatch(getUrlforFetchData(`${currentUrlis}`));      
 


    const [image, setImage] = useState({ imageSrc: '' });
  
    let modifiedArr = []

    if(props.car.images.length > 1) {
         modifiedArr = props.car.images.map((imgSrcO) => (
            {
            original: imgSrcO.imgSrc.imageSrc,
            thumbnail: imgSrcO.imgSrc.imageSrc,
            }
            
          ))
    }else {
         modifiedArr =   [ {
            original: 'https://thumbs.dreamstime.com/b/no-image-available-icon-photo-camera-flat-vector-illustration-132483141.jpg',
            thumbnail: 'https://thumbs.dreamstime.com/b/no-image-available-icon-photo-camera-flat-vector-illustration-132483141.jpg',
        }]
    }         

 

   async function addimage () {

    const data = {
        currentUrlis,
        image
    }

    const response = await fetch('../api/postCarDB', {
        method:'POST',
        body:JSON.stringify(data),
        headers:{
            'Content-Type' : 'application/json'
        }
    });   
    console.log("Finish") 


}        

function handledinamicWrap (e) {
   // console.log(e.target.id);
    var element = document.querySelectorAll('.dec-wrap');
    //var dataAttribute = element.getAttribute('SpecVozila');
   

    console.log(element)

}



    // Send a request to the backEND API
    // to Fetch some data etc

    return(
        <Layout>
            <h1>Profil vozila</h1>
            <p>Profil službenog vozila gde se mogu naći sve informacije u vezi vozila kao i informacije relevantne za njih.</p>

            <div className='row main-box'>
                <div className='col-md-6'>                   
                     <ImageGallery items={modifiedArr} />                    
                    <div className='uploadImg'>  
                        <label>                        
                                <FileBase64 multiple={ false } onDone={ ({base64}) => setImage({...image, imageSrc: base64}) } />    
                        </label>   
                        <p className='btn' onClick={addimage}>Upload Image</p>             
                    </div> 
                </div>
                <div className='col-md-6 info-desc'>
                        <h3>INFORMACIJE O VOZILU</h3>
                        <p><span>MARKA I TIP:</span> {props.car.title} </p>
                        <p><span>REGISTROVAN DO:</span> {props.car.date} </p>
                        <p><span>KORISNIK VOZILA:</span> {props.car.vehicleUser} </p>
                        <p><span>AKTIVNO OD:</span> {props.car.voziloAktivnoOd} </p>
                     
                </div>
            </div>

            <div className='description tabMenu'>
                <div className='row tabs'>
                    <div className='tab'><p onClick={handledinamicWrap} id="RegVozilaMain" className='active'>Registracija vozila</p></div>
                    <div className='tab'><p onClick={handledinamicWrap} id="SpecVozila">Specifikacija vozila</p></div>
                    <div className='tab'><p onClick={handledinamicWrap} id="GprivoiTroskovi">Gorivo i tekući troškovi</p></div>
                    <div className='tab'><p onClick={handledinamicWrap} id="Odrzavanje">Održavanje</p></div>
                    <div className='tab'><p onClick={handledinamicWrap} id="Steta">Šteta</p></div>
                    <div className='tab'><p onClick={handledinamicWrap} id="IstorijaPromena">Istorija promena</p></div>
                </div>

                <div className='dinamicWrap'>                

                    <div id-data="RegVozilaMain" className='wrap-RegVozila dec-wrap'>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Datum registracije</th>
                                    <th>Dokumentacija</th>
                                    <th>Troškovi registracije</th>
                                    <th> Registrovao zaposleni</th>
                                    <th>Vreme zaposlenog</th>
                                    <th>Registrovan do</th>
                                    <th className="actions">Action</th>
                                </tr>
                            </thead>
                            <tbody>                            
                            </tbody>
                        </table>
                    </div>

                    <div id-data="SpecVozila" className='dec-wrap'>
                        <h3>Specifikacija vozila</h3>
                    </div>
                    <div id-data="GprivoiTroskovi"  className='dec-wrap'>
                        <h3>Gorivo i tekući troškovi</h3>
                    </div>
                    <div id-data="Odrzavanje"  className='dec-wrap'>
                        <h3>Održavanje</h3>
                    </div>

                    <div id-data="Steta"  className='dec-wrap'>
                        <h3>Šteta</h3>
                    </div>

                    <div id-data="IstorijaPromena"  className='dec-wrap'>
                        <h3>Istorija promena</h3>
                    </div>   
                </div>       


            </div>


           
        </Layout>
    )
}




export async function getServerSideProps(context) {

    const id = context;

    console.log(context.params.carId)
    
    
    // fetch data from an API
    const client = await MongoClient.connect(
      'mongodb+srv://Admin:admin123@cluster0.3rzaz.mongodb.net/Cars?retryWrites=true&w=majority'
    );
    const db = client.db();  
    const meetupsCollection = db.collection('Car');
    const idRowData = context.params.carId  
    const cars = await meetupsCollection.findOne({regvalue: idRowData}); 

    console.log(cars)
  
    client.close();

    return {
        props: {
            car:{
                title: cars.title,
                registration: cars.regvalue,         
                id: cars._id.toString(),
                vehicleUser: cars.vehicleUser,
                date: cars.date,
                voziloAktivnoOd: cars.voziloAktivnoOd,
                
                images: cars.gallery.map((imgSrc) => ({
                    imgSrc
                   
                  })),              
               
                
            }
        }
    }
  

   
  }    







export default CarId;



  