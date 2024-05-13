'use client'

import React, { useState, useCallback, useEffect } from 'react'
import Webcam from 'react-webcam'
import { Icons } from '@ui/components/molecules/icons'
import { FileCard } from '@ui/components/cards/file-card'
import { Button } from '@ui/components/ui/button'
import { IdVerifyDrawer } from '@/components/modals/verify-id-drawer'
import { CardContent } from '@ui/components/ui/card'
import { useGlobalState } from '../../providers/global-context'
import { VerifyIDStepTitle } from '@/utils/config'
import IDPlaceHolderFront from '@/components/cards/id-place-holder-front'
import IDPlaceHolderBack from '@/components/cards/id-place-holder-back'
import CameraMask from '@/components/overlays/camera-mask'

const IDVerify: React.FC = () => {
  const [isPending, startTransition] = React.useTransition()
  const [deviceId, setDeviceId] = useState<string>()
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([])
  const webcamRef = React.useRef<Webcam>(null)
  const [frontSide, setFrontSide] = useState<string | null | undefined>()
  const [backSide, setBackSide] = useState<string | null | undefined>()
  const { nextStep, updateTitle } = useGlobalState()
  const [internalStep, setInternalStep] = useState(0)

  const handleDevices = useCallback(
    (mediaDevices: MediaDeviceInfo[]) =>
      setDevices(mediaDevices.filter(({ kind }) => kind === 'videoinput')),
    [setDevices],
  )

  async function onSubmit() {
    startTransition(async () => {
      try {
        nextStep()
      } catch (err) {
        console.log(err)
      }
    })
  }

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices)
  }, [handleDevices])

  useEffect(() => {
    updateTitle(VerifyIDStepTitle[internalStep])
  }, [internalStep])

  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot()
    // Set image
    !frontSide ? setFrontSide(imageSrc) : setBackSide(imageSrc)
    // Set step
    !backSide ? setInternalStep((pre) => pre + 1) : setInternalStep(2)
  }

  const switchCamera = () => {
    const currentIndex = devices.findIndex(
      (device) => device.deviceId === deviceId,
    )
    const nextIndex = (currentIndex + 1) % devices.length
    const nextDevice = devices[nextIndex]
    setDeviceId(nextDevice.deviceId)
  }

  const onFrontSideRemoved = () => {
    setFrontSide(undefined)
    setInternalStep(0)
  }

  const onBackSideRemoved = () => {
    setBackSide(undefined)
    frontSide ? setInternalStep(1) : setInternalStep(0)
  }

  return (
    <CardContent className="w-full h-full flex flex-col justify-between 2xl:w-1/2 xl:w-3/5 plg:w-3/4 py-6 gap-4">
      <div className="h-3/5 w-full flex flex-col justify-evenly relative">
        <div className="relative">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              deviceId: deviceId ? { exact: deviceId } : undefined,
              width: 1200,
              height: 720,
            }}
            className="rounded-2xl w-full h-full shadow-lg"
          />
          <CameraMask />
          {devices.length && (
            <Button
              className="absolute right-4 top-4"
              variant="outline"
              size="sm"
              onClick={switchCamera}
            >
              <Icons.reload className="h-4 w-4" />
            </Button>
          )}
        </div>
        <p className="p-4 text-center">
          Đưa mặt trước của CCCD vào khung để bắt đầu chụp
        </p>
      </div>
      <div className="flex w-full gap-8">
        {frontSide ? (
          <FileCard onRemove={onFrontSideRemoved} file={frontSide} />
        ) : (
          <IDPlaceHolderFront />
        )}
        {backSide ? (
          <FileCard onRemove={onBackSideRemoved} file={backSide} />
        ) : (
          <IDPlaceHolderBack />
        )}
      </div>
      <div className="flex flex-col items-center justify-end min-h-16">
        {internalStep >= 2 ? (
          <Button onClick={onSubmit} className="w-full">
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
            onClick={capture}
          />
        )}
      </div>
      <IdVerifyDrawer />
    </CardContent>
  )
}

export default IDVerify
