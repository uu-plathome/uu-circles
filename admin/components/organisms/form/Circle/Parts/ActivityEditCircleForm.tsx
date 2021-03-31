import { BaseCheckBox } from '@/components/atoms/form/BaseCheckBox'
import { BaseSelect } from '@/components/atoms/form/BaseSelect'
import { BaseTextarea } from '@/components/atoms/form/BaseTextarea'
import { UseBooleanInput, UseStringInput } from '@/hooks/useInput'
import { __ } from '@/lang/ja'
import { getAllPlaceOfActivity } from '@/lib/enum/api/PlaceOfActivity'
import { getAllWeek, Week } from '@/lib/enum/api/Week'
import { FC, useEffect, useState } from 'react'

type Props = {
  form: {
    commonPlaceOfActivity: UseStringInput
    commonPlaceOfActivityDetail: UseStringInput
    commonDateOfActivityMonday: UseBooleanInput
    commonDateOfActivityTuesday: UseBooleanInput
    commonDateOfActivityWednesday: UseBooleanInput
    commonDateOfActivityThursday: UseBooleanInput
    commonDateOfActivityFriday: UseBooleanInput
    commonDateOfActivitySaturday: UseBooleanInput
    commonDateOfActivitySunday: UseBooleanInput
    commonDateOfActivityDetail: UseStringInput
    isOnlineActivity: UseBooleanInput
    onlinePlaceOfActivityDetail: UseStringInput
    onlineDateOfActivityMonday: UseBooleanInput
    onlineDateOfActivityTuesday: UseBooleanInput
    onlineDateOfActivityWednesday: UseBooleanInput
    onlineDateOfActivityThursday: UseBooleanInput
    onlineDateOfActivityFriday: UseBooleanInput
    onlineDateOfActivitySaturday: UseBooleanInput
    onlineDateOfActivitySunday: UseBooleanInput
    onlineDateOfActivityDetail: UseStringInput
  }
}
const ActivityEditCircleForm: FC<Props> = ({ form }) => {
  const [
    checkedCommonDateOfActivity,
    setCheckedCommonDateOfActivity,
  ] = useState<string[]>([])
  const [
    checkedOnlineDateOfActivity,
    setCheckedOnlineDateOfActivity,
  ] = useState<string[]>([])

  // 通常活動日
  useEffect(() => {
    const _checkedCommonDateOfActivity = []
    if (form.commonDateOfActivityMonday.toBoolean) {
      _checkedCommonDateOfActivity.push(Week.MONDAY)
    }
    if (form.commonDateOfActivityTuesday.toBoolean) {
      _checkedCommonDateOfActivity.push(Week.TUESDAY)
    }
    if (form.commonDateOfActivityWednesday.toBoolean) {
      _checkedCommonDateOfActivity.push(Week.WEDNESDAY)
    }
    if (form.commonDateOfActivityThursday.toBoolean) {
      _checkedCommonDateOfActivity.push(Week.THURSDAY)
    }
    if (form.commonDateOfActivityFriday.toBoolean) {
      _checkedCommonDateOfActivity.push(Week.FRIDAY)
    }
    if (form.commonDateOfActivitySaturday.toBoolean) {
      _checkedCommonDateOfActivity.push(Week.SATURDAY)
    }
    if (form.commonDateOfActivitySunday.toBoolean) {
      _checkedCommonDateOfActivity.push(Week.SUNDAY)
    }
    setCheckedCommonDateOfActivity(_checkedCommonDateOfActivity)
  }, [form])

  // オンライン活動日
  useEffect(() => {
    const _checkedOnlineDateOfActivity = []
    if (form.onlineDateOfActivityMonday.toBoolean) {
      _checkedOnlineDateOfActivity.push(Week.MONDAY)
    }
    if (form.onlineDateOfActivityTuesday.toBoolean) {
      _checkedOnlineDateOfActivity.push(Week.TUESDAY)
    }
    if (form.onlineDateOfActivityWednesday.toBoolean) {
      _checkedOnlineDateOfActivity.push(Week.WEDNESDAY)
    }
    if (form.onlineDateOfActivityThursday.toBoolean) {
      _checkedOnlineDateOfActivity.push(Week.THURSDAY)
    }
    if (form.onlineDateOfActivityFriday.toBoolean) {
      _checkedOnlineDateOfActivity.push(Week.FRIDAY)
    }
    if (form.onlineDateOfActivitySaturday.toBoolean) {
      _checkedOnlineDateOfActivity.push(Week.SATURDAY)
    }
    if (form.onlineDateOfActivitySunday.toBoolean) {
      _checkedOnlineDateOfActivity.push(Week.SUNDAY)
    }
    setCheckedOnlineDateOfActivity(_checkedOnlineDateOfActivity)
  }, [form])

  const onChangeCommonDateOfActivity = (e) => {
    const newVal = e.target.value
    if (newVal === Week.MONDAY) {
      form.commonDateOfActivityMonday.set(
        !form.commonDateOfActivityMonday.toBoolean
      )
    }
    if (newVal === Week.MONDAY) {
      form.commonDateOfActivityMonday.set(
        !form.commonDateOfActivityMonday.toBoolean
      )
    }
    if (newVal === Week.TUESDAY) {
      form.commonDateOfActivityTuesday.set(
        !form.commonDateOfActivityTuesday.toBoolean
      )
    }
    if (newVal === Week.WEDNESDAY) {
      form.commonDateOfActivityWednesday.set(
        !form.commonDateOfActivityWednesday.toBoolean
      )
    }
    if (newVal === Week.THURSDAY) {
      form.commonDateOfActivityThursday.set(
        !form.commonDateOfActivityThursday.toBoolean
      )
    }
    if (newVal === Week.FRIDAY) {
      form.commonDateOfActivityFriday.set(
        !form.commonDateOfActivityFriday.toBoolean
      )
    }
    if (newVal === Week.SATURDAY) {
      form.commonDateOfActivitySaturday.set(
        !form.commonDateOfActivitySaturday.toBoolean
      )
    }
    if (newVal === Week.SUNDAY) {
      form.commonDateOfActivitySunday.set(
        !form.commonDateOfActivitySunday.toBoolean
      )
    }
  }

  const onChangeOnlineDateOfActivity = (e) => {
    const newVal = e.target.value
    if (newVal === Week.MONDAY) {
      form.onlineDateOfActivityMonday.set(
        !form.onlineDateOfActivityMonday.toBoolean
      )
    }
    if (newVal === Week.MONDAY) {
      form.onlineDateOfActivityMonday.set(
        !form.onlineDateOfActivityMonday.toBoolean
      )
    }
    if (newVal === Week.TUESDAY) {
      form.onlineDateOfActivityTuesday.set(
        !form.onlineDateOfActivityTuesday.toBoolean
      )
    }
    if (newVal === Week.WEDNESDAY) {
      form.onlineDateOfActivityWednesday.set(
        !form.onlineDateOfActivityWednesday.toBoolean
      )
    }
    if (newVal === Week.THURSDAY) {
      form.onlineDateOfActivityThursday.set(
        !form.onlineDateOfActivityThursday.toBoolean
      )
    }
    if (newVal === Week.FRIDAY) {
      form.onlineDateOfActivityFriday.set(
        !form.onlineDateOfActivityFriday.toBoolean
      )
    }
    if (newVal === Week.SATURDAY) {
      form.onlineDateOfActivitySaturday.set(
        !form.onlineDateOfActivitySaturday.toBoolean
      )
    }
    if (newVal === Week.SUNDAY) {
      form.onlineDateOfActivitySunday.set(
        !form.onlineDateOfActivitySunday.toBoolean
      )
    }
  }

  return (
    <div>
      <BaseSelect
        label="通常活動場所"
        id="commonPlaceOfActivity"
        name="commonPlaceOfActivity"
        items={[
          ...getAllPlaceOfActivity().map((_placeOfActivity) => ({
            value: _placeOfActivity,
            label: __(_placeOfActivity),
          })),
        ]}
        {...form.commonPlaceOfActivity}
      />

      <BaseTextarea
        label="通常活動場所詳細"
        name="placeOfActivityDetail"
        id="placeOfActivityDetail"
        expand
        note="例）月:4号館 / 金:グラウンド"
        maxLength={255}
        {...form.commonPlaceOfActivityDetail}
      />

      <BaseCheckBox
        id="commonDateOfActivity"
        name="commonDateOfActivity"
        label="通常活動日"
        items={[
          ...getAllWeek().map((_week) => ({
            value: _week,
            checked: checkedCommonDateOfActivity.includes(_week),
            label: __(_week, 'Week'),
          })),
        ]}
        error={
          form.commonDateOfActivityMonday.error ||
          form.commonDateOfActivityTuesday.error ||
          form.commonDateOfActivityWednesday.error ||
          form.commonDateOfActivityThursday.error ||
          form.commonDateOfActivityFriday.error ||
          form.commonDateOfActivitySaturday.error ||
          form.commonDateOfActivitySunday.error
        }
        onChange={onChangeCommonDateOfActivity}
        mdCols={4}
      ></BaseCheckBox>

      <BaseTextarea
        label="通常活動日時詳細"
        name="commonDateOfActivityDetail"
        id="commonDateOfActivityDetail"
        expand
        maxLength={255}
        note="例）月曜日: 18:00-20:00 / 土曜日: 全日"
        {...form.commonDateOfActivityDetail}
      />

      <BaseSelect
        label="オンライン活動しているかどうか"
        id="doOnlineActivity"
        name="doOnlineActivity"
        items={[
          { value: 'true', label: 'オンラインしている' },
          { value: 'false', label: 'オフラインのみ' },
        ]}
        {...form.isOnlineActivity}
      />

      {form.isOnlineActivity.toBoolean ? (
        <div>
          <BaseCheckBox
            id="onlineDateOfActivity"
            name="onlineDateOfActivity"
            label="オンライン活動日"
            items={[
              ...getAllWeek().map((_week) => ({
                value: _week,
                checked: checkedOnlineDateOfActivity.includes(_week),
                label: __(_week, 'Week'),
              })),
            ]}
            error={
              form.onlineDateOfActivityMonday.error ||
              form.onlineDateOfActivityTuesday.error ||
              form.onlineDateOfActivityWednesday.error ||
              form.onlineDateOfActivityThursday.error ||
              form.onlineDateOfActivityFriday.error ||
              form.onlineDateOfActivitySaturday.error ||
              form.onlineDateOfActivitySunday.error
            }
            onChange={onChangeOnlineDateOfActivity}
            mdCols={4}
          ></BaseCheckBox>

          <BaseTextarea
            label="オンライン活動日時詳細"
            name="onlineDateOfActivityDetail"
            id="onlineDateOfActivityDetail"
            expand
            note="例）月曜日: 18:00-20:00 / 土曜日: 全日"
            maxLength={255}
            {...form.onlineDateOfActivityDetail}
          />
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export { ActivityEditCircleForm }
