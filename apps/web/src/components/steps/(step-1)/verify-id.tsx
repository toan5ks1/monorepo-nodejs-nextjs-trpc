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

const WebcamCapture: React.FC = () => {
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
        setTimeout(() => {
          nextStep()
        }, 1000)
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

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot()
    !frontSide ? setFrontSide(imageSrc) : setBackSide(imageSrc)
    setInternalStep((pre) => pre + 1)
  }, [webcamRef, frontSide, setBackSide])

  const switchCamera = () => {
    const currentIndex = devices.findIndex(
      (device) => device.deviceId === deviceId,
    )
    const nextIndex = (currentIndex + 1) % devices.length
    const nextDevice = devices[nextIndex]
    setDeviceId(nextDevice.deviceId)
  }

  return (
    <div className="h-full w-full flex flex-col items-center justify-between rounded-xl sm:border sm:shadow border-0 bg-card text-card-foreground shadow-none">
      <CardContent className="w-full h-full flex flex-col justify-between xl:w-3/5 plg:w-3/5 py-6 gap-4">
        <div className="h-3/5 w-full flex flex-col justify-start relative">
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
              className="rounded-2xl aspect-[15/9] shadow-lg"
            />
            <div className="absolute rounded-tl-xl top-[-8px] left-[-8px] border-t-2 border-l-2 border-gray-500 h-4 w-4"></div>
            <div className="absolute rounded-tr-xl top-[-8px] right-[-8px] border-t-2 border-r-2 border-gray-500 h-4 w-4"></div>
            <div className="absolute rounded-bl-xl bottom-[-8px] left-[-8px] border-b-2 border-l-2 border-gray-500 h-4 w-4"></div>
            <div className="absolute rounded-br-xl bottom-[-8px] right-[-8px] border-b-2 border-r-2 border-gray-500 h-4 w-4"></div>
            {devices.length == 1 && (
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
          <FileCard
            onRemove={() => setFrontSide(undefined)}
            file={frontSide}
            side="Mặt trước"
          />
          <FileCard
            onRemove={() => setBackSide(undefined)}
            file={backSide}
            side="Mặt sau"
          />
        </div>
        <div className="flex flex-col items-center justify-end">
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
              className="rounded-full w-16 h-16 flex items-center justify-center border-4 border-bg-background bg-[#ff0000e8]"
              onClick={capture}
            />
          )}
        </div>
      </CardContent>
      <IdVerifyDrawer />
    </div>
  )
}

export default WebcamCapture
