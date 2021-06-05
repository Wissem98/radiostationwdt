import React, { useEffect, useState } from 'react';
import { getStationsList } from './station.api';
import Typography  from '@material-ui/core/Typography';
import { RouteComponentProps } from '@reach/router';
import { Station } from '../common/types';

import { TableContainer,Table,TableHead,TableRow,TableBody,TableCell} from '@material-ui/core';
import { truncate } from 'fs';



var f: string;
var g: boolean =false;

interface HomeProps extends RouteComponentProps {
}


const Home: React.FC<HomeProps> = ({}) => {
  
  const [stations, setStations] = useState<Station[] | null>(null)
  
  useEffect(() => {
    const fetchStationsList = async () => {
      const stationsList = await getStationsList()
      setStations(stationsList)
      

    }
  
    fetchStationsList()
  }, [])

  const clickMe = (gameId: string) => {
    
    console.log("Button Clicks");
    f = gameId;
    console.log(gameId);
    console.log(f);
   
    if (g == false)
    {
      setShow(true);
      setShoww(true);
      g = true;
    }
    else 
    {
      setShow(false);
      setShoww(false);
      g = false;
      
    }
    
    
    
  
    
  
};
  const [show, setShow] = useState(false)
  const [showw, setShoww] = useState(false)
  const clickS = () => () => {
      //shsshh
   
  }
  
  return (<>
   
    <div className="card">
    
    <div className="flip-card-inner">
  <div className="flip-card-front">
  
       <div className="header">
            < ul className="headerelement">
           
 <li><a href="/"  className="one"> <button  className="previous"> </button>
</a></li>
 <li><a href="/" >    <h1 className="station">STATIONS</h1>
</a></li>
 <li><a href="/">  <button  className="shutdown"> </button>
</a></li>

</ul>   
       </div>
      
       <div className="card-body">
     
      
            <Typography  variant="h1" > </Typography>
           
    <TableContainer className="tc"> </TableContainer>
            <Table className="table" id="table" >
              
      <TableHead>
                <TableRow id="b"  >
                  
                  
        </TableRow>
          
      </TableHead>
      <TableBody className="tbody" >
        
                {stations && stations.map(station => (
          
          <TableRow  title="DoubleClick"  onClick={()=>clickS()} hover key={station.name} >
         
            <TableCell onClick={()=>clickMe(station.name)} >
            
            
            
                      <tr  id="a"  className="nameS" >{station.name}   </tr>
           
            
              
            </TableCell>

            <TableCell onClick={()=>clickMe(station.name)} className="freqS">
           <tr className="freqS" >  &nbsp; &nbsp; &nbsp; {station.frequency} </tr>
            </TableCell>
            
            
          </TableRow>
        
        
        ))}

    </TableBody>
    
    
    
        </Table>
        <div className="bn">
      {
                show ? 
                  
                  <div className="accent-bar">
    <ul className="accents">
      
        
        <li> <button  className="minus"> </button>
</li>
<li> <button  className="label"> </button>
</li>
<li> <button  className="plus"> </button>
</li>
       
    </ul>

                </div>
                  
                  
                  
                  
                  : null

    }

    </div>
        
       </div>

       

          <div className="bottom">
            
            <h1 className="currentstring">CURRENTLY PLAYING</h1>
            {
                showw ?                 
                <h1 className="stationplayed" id="sname">  &nbsp; {f}</h1>
                  : null

    }
           
         
          </div>
          
      

     </div>

      

        <div className="flip-card-back">
          <h1 className="slogan"> Full time Community
            Radio </h1>
            <h1 className="slo">  at it’s best.</h1>
          
        </div>
        
      </div>
      

      
    </div>
    
    
  </>);

}


export default Home