'use client'

import React, { useState, useCallback, useEffect, useMemo } from 'react'
import Webcam from 'react-webcam'
import { Icons } from '@ui/components/molecules/icons'
import { Button } from '@ui/components/ui/button'
import { CardContent } from '@ui/components/ui/card'
import { useGlobalState } from '../../providers/global-context'
import CameraMask from '@/components/overlays/camera-mask'
import { getFaceActions } from '@/actions/face-actions'
import { FaceVerifyDrawer } from '@/components/modals/verify-face-drawer'
import CircularProgress from '@/components/overlays/radial-progress'

const FaceVerify: React.FC = () => {
  const [isPending, startTransition] = React.useTransition()
  const [deviceId, setDeviceId] = useState<string>()
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([])
  const [internalStep, setInternalStep] = useState(0)
  const [images, setImages] = useState<string[]>([])
  const { nextStep, updateTitle } = useGlobalState()
  const [actions, setActions] = useState<string[]>([])
  const [curAction, setCurAction] = useState(0)
  const webcamRef = React.useRef<Webcam>(null)

  const progress = useMemo(() => {
    return actions.length ? (curAction / actions.length) * 100 : 0
  }, [curAction])

  useEffect(() => {
    ;(async () => {
      const actions = await getFaceActions()
      setActions(actions as string[])
    })()
  }, [])

  const nextAction = () => {
    curAction < actions.length
      ? setCurAction((pre) => pre + 1)
      : setCurAction(0)
  }

  const handleDevices = useCallback(
    (mediaDevices: MediaDeviceInfo[]) =>
      setDevices(mediaDevices.filter(({ kind }) => kind === 'videoinput')),
    [setDevices],
  )

  async function onSubmit() {
    // startTransition(async () => {
    //   try {
    //     setTimeout(() => {
    //       nextStep()
    //     }, 1000)
    //   } catch (err) {
    //     console.log(err)
    //   }
    // })
  }

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices)
  }, [handleDevices])

  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot()
    // Set image
    imageSrc && setImages((pre) => [...pre, imageSrc])
    // Set step
    // !backSide ? setInternalStep((pre) => pre + 1) : setInternalStep(2)
  }

  // const switchCamera = () => {
  //   const currentIndex = devices.findIndex(
  //     (device) => device.deviceId === deviceId,
  //   )
  //   const nextIndex = (currentIndex + 1) % devices.length
  //   const nextDevice = devices[nextIndex]
  //   setDeviceId(nextDevice.deviceId)
  // }

  return (
    <div className="h-full w-full flex flex-col items-center justify-between rounded-xl">
      <CardContent className="w-full h-full flex flex-col justify-between items-center 2xl:w-1/2 xl:w-3/5 plg:w-3/5 md:w-4/5 py-6 gap-4">
        <div className="h-3/5 xl:w-4/5 sm:w-full flex flex-col justify-evenly relative">
          <div className="relative">
            <CircularProgress progress={progress}>
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={{
                  deviceId: deviceId ? { exact: deviceId } : undefined,
                  width: 1080,
                  height: 1080,
                }}
                className="rounded-full w-full h-full shadow-lg"
              />
            </CircularProgress>
            {/* {devices.length && (
              <Button
                className="absolute right-4 top-4"
                variant="outline"
                size="sm"
                onClick={switchCamera}
              >
                <Icons.reload className="h-4 w-4" />
              </Button>
            )} */}
          </div>
          {actions.length ? (
            <p className="p-4 text-center">
              {actions[curAction] ?? 'hoan tat'}
            </p>
          ) : (
            <p className="p-4 text-center">⌛Downloading message...</p>
          )}
        </div>
        <div className="flex w-full gap-8">
          {/* {frontSide ? (
            <FileCard onRemove={onFrontSideRemoved} file={frontSide} />
          ) : (
            <IDPlaceHolderFront />
          )}
          {backSide ? (
            <FileCard onRemove={onBackSideRemoved} file={backSide} />
          ) : (
            <IDPlaceHolderBack />
          )} */}
        </div>
        <div className="flex flex-col items-center justify-end min-h-16 w-full">
          {curAction > 2 ? (
            <Button onClick={nextStep} className="w-full">
              {isPending && (
                <Icons.spinner
                  className="mr-2 h-4 w-4 animate-spin"
                  aria-hidden="true"
                />
              )}
              Tiếp tục
              <span className="sr-only">Tiếp tục</span>
            </Button>
          ) : (
            <Button
              className="rounded-full w-16 h-16 flex items-center justify-center border-4 border-bg-background bg-[#ff0000e8] hover:bg-[#ff0000c3]"
              onClick={nextAction}
            />
          )}
        </div>
      </CardContent>
      <FaceVerifyDrawer />
    </div>
  )
}

export default FaceVerify
