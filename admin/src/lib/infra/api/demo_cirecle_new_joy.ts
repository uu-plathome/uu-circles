import { AxiosError } from 'axios'
import { axiosInstance } from '.'
import {
  RegisterDemoCircleNewJoyRequest,
  RegisterDemoCircleNewJoyRequestValidationError,
} from '@/src/lib/types/api/RegisterDemoCircleNewJoyRequest'
import {
  UpdateDemoCircleNewJoyRequest,
  UpdateDemoCircleNewJoyRequestValidationError,
} from '@/src/lib/types/api/UpdateDemoCircleNewJoyRequest'
import { DemoCircleNewJoy } from '@/src/lib/types/model/DemoCircleNewJoy'

export const createDemoCircleNewJoy = async (
  circleId: number,
  demoCircleNewJoy: RegisterDemoCircleNewJoyRequest
) => {
  try {
    await axiosInstance.post(
      `/admin/api/circle/${circleId}/demo/newjoy`,
      demoCircleNewJoy
    )

    return
  } catch (_e) {
    const e = _e as AxiosError<RegisterDemoCircleNewJoyRequestValidationError>

    if (e.response && e.response.status === 422 && e.response.data) {
      return {
        ...e.response.data,
        type: 'RegisterDemoCircleNewJoyRequestValidationError',
      } as RegisterDemoCircleNewJoyRequestValidationError
    }

    console.error(e)
  }
}

export const updateDemoCircleNewJoy = async (
  demoCircleNewJoyId: number,
  demoCircleNewJoy: UpdateDemoCircleNewJoyRequest
) => {
  try {
    await axiosInstance.put(
      `/admin/api/circle/demo/newjoy/${demoCircleNewJoyId}`,
      demoCircleNewJoy
    )

    return
  } catch (_e) {
    const e = _e as AxiosError<UpdateDemoCircleNewJoyRequestValidationError>

    if (e.response && e.response.status === 422 && e.response.data) {
      return {
        ...e.response.data,
        type: 'UpdateDemoCircleNewJoyRequestValidationError',
      } as UpdateDemoCircleNewJoyRequestValidationError
    }

    console.error(e)
  }
}

export const getDemoCircleNewJoyList = async () => {
  console.log('getDemoCircleNewJoyList args none')

  const { data } = await axiosInstance.get<{
    demoCircleNewJoys: {
      circleId: number
      name: string
      demoCircleNewJoy: DemoCircleNewJoy
    }[]
  }>(`/admin/api/circle/demo/newjoy`)

  return {
    demoCircleNewJoys: data.demoCircleNewJoys,
  }
}

export const getDemoCircleNewJoy = async (demoCircleNewJoyId: number) => {
  const { data } = await axiosInstance.get<{
    demoCircleNewJoy: {
      circleId: number
      name: string
      demoCircleNewJoy: DemoCircleNewJoy
    }
  }>(`/admin/api/circle/demo/newjoy/${demoCircleNewJoyId}`)

  return {
    demoCircleNewJoy: data.demoCircleNewJoy,
  }
}
