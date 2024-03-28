import { Canvas } from '@react-three/fiber'
import Spline from '@splinetool/react-spline'
import React from 'react'

type Props = {}

export default function Cubes3D({}: Props) {
  return (
    <div className='h-screen w-full overflow-hidden'>
        {/* <Canvas
              shadows
              className="bg-black"
              camera={{
                  position: [-6, 7, 7],
              }}>
                null
      </Canvas> */}
      <Spline
  scene={'https://prod.spline.design/rq1V5LDOX8jvnbEc/scene.splinecode'}
  renderOnDemand={false}
/>
      {/* <iframe src='https://my.spline.design/cubic-821651ee8df583321c0c8f4c6411cf72/' frameBorder='0' width='100%' height='100%'></iframe> */}
    </div>
  )
}