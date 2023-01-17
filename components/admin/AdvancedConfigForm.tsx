import { ReceiptType } from '@cardinal/staking/dist/cjs/programs/stakePool'
import type { PublicKey } from '@solana/web3.js'
import type { StakePoolMetadata } from 'api/mapping'
import { TokenStandard } from 'api/mapping'
import { FormFieldTitleInput } from 'common/FormFieldInput'
import { LoadingSpinner } from 'common/LoadingSpinner'
import { SelectorBoolean } from 'common/SelectorBoolean'
import { useFormik } from 'formik'
import { useStakePoolData } from 'hooks/useStakePoolData'
import { useStakePoolId } from 'hooks/useStakePoolId'
import { useStakePoolMetadata } from 'hooks/useStakePoolMetadata'
import { HexColorPicker } from 'react-colorful'
import validateColor from 'validate-color'
import * as Yup from 'yup'

import { publicKeyValidationTest } from '@/components/stake-pool-creation/Schema'
import { SelectInput } from '@/components/UI/inputs/SelectInput'
import { TextInput } from '@/components/UI/inputs/TextInput'
import { HeadingSecondary } from '@/components/UI/typography/HeadingSecondary'

const defaultValues = (stakePoolData: StakePoolMetadata) => {
  return {
    ...stakePoolData,
    stakePoolAddress: stakePoolData.stakePoolAddress?.toString() || undefined,
  }
}

const colorOptions = [
  {
    label: 'Primary',
    value: 'primary',
    description: 'Primary color',
  },
  {
    label: 'Secondary',
    value: 'secondary',
    description: 'Secondary color',
  },
  {
    label: 'Accent',
    value: 'accent',
    description: 'Accent color',
  },
  {
    label: 'Font',
    value: 'fontColor',
    description: 'Font color',
  },
  {
    label: 'Secondary font',
    value: 'fontColorSecondary',
    description: 'Secondary font color',
  },
  {
    label: 'Secondary background',
    value: 'backgroundSecondary',
    description: 'Secondary background color',
  },
] as const

const validationSchema = Yup.object({
  name: Yup.string().required(),
  displayName: Yup.string().required(),
  nameInHeader: Yup.string(),
  stakePoolAddress: Yup.string().test(
    'is-public-key',
    'Invalid reward mint address',
    publicKeyValidationTest
  ),
  description: Yup.string(),
  receiptType: Yup.string(),
  tokenStandard: Yup.number(),
  hidden: Yup.boolean(),
  notFound: Yup.boolean(),
  hostname: Yup.string(),
  hideFooter: Yup.boolean(),
  redirect: Yup.string(),
  hideAllowedTokens: Yup.boolean(),
  // styles is a stringified JSON object
  styles: Yup.string(),
  contrastHomepageBkg: Yup.boolean(),
  colors: Yup.object({
    primary: Yup.string()
      .required()
      .test('is-color', 'Invalid color', (value) => {
        return (
          (value !== undefined && validateColor(value)) ||
          validateColor(`#${value}`)
        )
      }),
    secondary: Yup.string()
      .required()
      .test('is-color', 'Invalid color', (value) => {
        return (
          (value !== undefined && validateColor(value)) ||
          validateColor(`#${value}`)
        )
      }),
    accent: Yup.string().test('is-color', 'Invalid color', (value) => {
      return (
        (value !== undefined && validateColor(value)) ||
        validateColor(`#${value}`)
      )
    }),
    fontColor: Yup.string().test('is-color', 'Invalid color', (value) => {
      return (
        (value !== undefined && validateColor(value)) ||
        validateColor(`#${value}`)
      )
    }),
    fontColorSecondary: Yup.string().test(
      'is-color',
      'Invalid color',
      (value) => {
        return (
          (value !== undefined && validateColor(value)) ||
          validateColor(`#${value}`)
        )
      }
    ),
    backgroundSecondary: Yup.string().test(
      'is-color',
      'Invalid color',
      (value) => {
        return (
          (value !== undefined && validateColor(value)) ||
          validateColor(`#${value}`)
        )
      }
    ),
    fontColorTertiary: Yup.string().test(
      'is-color',
      'Invalid color',
      (value) => {
        return (
          (value !== undefined && validateColor(value)) ||
          validateColor(`#${value}`)
        )
      }
    ),
  }),
  disallowRegions: Yup.array().of(Yup.string()),
  logoPadding: Yup.boolean(),
  socialLinks: Yup.array(),
  imageUrl: Yup.string(),
  secondaryImageUrl: Yup.string(),
  backgroundImage: Yup.string(),
  websiteUrl: Yup.string(),
  maxStaked: Yup.number(),
  links: Yup.array().of(
    Yup.object({
      text: Yup.string().required(),
      value: Yup.string().required(),
    })
  ),
  airdrops: Yup.array().of(
    Yup.object({
      name: Yup.string().required(),
      symbol: Yup.string().required(),
      uri: Yup.string().required(),
    })
  ),
  analytics: Yup.array().of(
    Yup.object({
      metadata: Yup.object({
        key: Yup.string().required(),
        type: Yup.string().required(),
        totals: Yup.array().of(
          Yup.object({
            key: Yup.string().required(),
            value: Yup.number().required(),
          })
        ),
      }),
    })
  ),
})

export const AdvancedConfigForm = ({
  onSuccess,
}: {
  onSuccess?: (p: PublicKey | undefined) => void
}) => {
  const stakePooldId = useStakePoolId()
  const stakePool = useStakePoolData()
  const stakePoolMetadata = useStakePoolMetadata()
  const initialValues = stakePoolMetadata?.data
    ? defaultValues({
        ...stakePoolMetadata.data,
      })
    : defaultValues({} as StakePoolMetadata)

  const formState = useFormik({
    initialValues,
    onSubmit: () => {},
    validationSchema,
  })

  if (stakePooldId && !stakePool.isFetched) return <LoadingSpinner />
  const { values, errors, setFieldValue, setValues } = formState

  const handleColorChange = (color: string, value: string) => {
    // if (color.length !== 7 || color[0] !== '#') {
    //   return
    // }
    setFieldValue(`colors.${value}`, color)
  }

  return (
    <div className="w-full space-y-8">
      <div className="w-full">
        <FormFieldTitleInput
          title={'Name'}
          description={
            'Name of this stake pool used as an id. Should be in lower-case kebab-case since it is used in the URL as /{name}'
          }
        />
        <TextInput
          disabled={false}
          hasError={!!values.name && values.name !== '' && !!errors.name}
          placeholder={'Enter name'}
          value={values.name}
          onChange={(e) => {
            setFieldValue('name', e.target.value)
          }}
        />
      </div>
      <div className="full">
        <FormFieldTitleInput
          title={'Display Name'}
          description={
            'Display name to be displayed in the header. Often the same as name but with capital letters and spaces'
          }
        />
        <TextInput
          disabled={false}
          hasError={
            !!values.displayName &&
            values.displayName !== '' &&
            !!errors.displayName
          }
          placeholder={'Enter display name'}
          value={values.displayName}
          onChange={(e) => {
            setFieldValue('displayName', e.target.value)
          }}
        />
      </div>
      <div className="full">
        <FormFieldTitleInput
          title={'Name in Header'}
          description={'Whether or not to show name in header'}
        />
        <SelectorBoolean
          handleChange={(v) => setFieldValue('nameInHeader', v)}
        />
      </div>
      <div className="full">
        <FormFieldTitleInput
          title={'Stake pool address'}
          description={'Publickey for this stake pool'}
        />
        <TextInput
          hasError={
            !!values.stakePoolAddress &&
            values.stakePoolAddress !== '' &&
            !!errors.stakePoolAddress
          }
          placeholder={'Enter publickey'}
          value={values.stakePoolAddress}
          onChange={(e) => {
            setFieldValue('stakePoolAddress', e.target.value)
          }}
        />
      </div>
      <div className="full">
        <FormFieldTitleInput
          title={'Description'}
          description={'Description for this stake pool'}
        />
        <TextInput
          hasError={
            !!values.description &&
            values.description !== '' &&
            !!errors.description
          }
          placeholder={'Enter description'}
          value={values.description}
          onChange={(e) => {
            setFieldValue('description', e.target.value)
          }}
        />
      </div>
      <div className="full">
        <FormFieldTitleInput
          title={'Receipt type'}
          description={
            'Default receipt type. Setting this will remove the option for the user to choose which receipt type to use'
          }
        />
        <SelectInput
          className="w-full"
          value={String(values.receiptType) || ''}
          setValue={(v) => setFieldValue('receiptType', v)}
          options={[
            { label: 'Original', value: String(ReceiptType.Original) },
            { label: 'Receipt', value: String(ReceiptType.Receipt) },
            { label: 'None', value: String(ReceiptType.None) },
          ]}
        />
      </div>
      <div className="full">
        <FormFieldTitleInput
          title={'Token standard'}
          description={
            'Default empty. Setting this will tell the UI to only show tokens of that standard. Supports fungible or non-fungible'
          }
        />
        <SelectInput
          className="w-full"
          value={String(values.tokenStandard) || ''}
          setValue={(v) => setFieldValue('tokenStandard', v)}
          options={[
            { label: 'Fungible', value: String(TokenStandard.Fungible) },
            { label: 'Non-fungible', value: String(TokenStandard.NonFungible) },
            { label: 'None', value: String(TokenStandard.None) },
          ]}
        />
      </div>
      <div className="full">
        <FormFieldTitleInput
          title={'Hidden'}
          description={'Optional config to hide this pool from the main page'}
        />
        <SelectorBoolean handleChange={(v) => setFieldValue('hidden', v)} />
      </div>
      <div className="full">
        <FormFieldTitleInput
          title={'Not found'}
          description={'Optional config to disable finding this pool'}
        />
        <SelectorBoolean handleChange={(v) => setFieldValue('notFound', v)} />
      </div>
      <div className="full">
        <FormFieldTitleInput
          title={'Hostname'}
          description={'Optional hostname to remap'}
        />
        <TextInput
          disabled={false}
          hasError={
            !!values.hostname && values.hostname !== '' && !!errors.hostname
          }
          placeholder={'Enter hostname'}
          value={values.hostname}
          onChange={(e) => {
            setFieldValue('hostname', e.target.value)
          }}
        />
      </div>
      <div className="full">
        <FormFieldTitleInput
          title={'Hide footer'}
          description={'Optional config to disable finding this pool'}
        />
        <SelectorBoolean handleChange={(v) => setFieldValue('notFound', v)} />
      </div>
      <div className="full">
        <FormFieldTitleInput
          title={'Redirect url'}
          description={
            'Optional config to link redirect to page when you click on this pool'
          }
        />
        <TextInput
          disabled={false}
          hasError={
            !!values.redirect && values.redirect !== '' && !!errors.redirect
          }
          placeholder={'Enter redirect url'}
          value={values.redirect}
          onChange={(e) => {
            setFieldValue('redirect', e.target.value)
          }}
        />
      </div>
      <div className="full">
        <FormFieldTitleInput
          title={'Hide allowed tokens'}
          description={'Hide allowed tokens style'}
        />
        <SelectorBoolean
          handleChange={(v) => setFieldValue('hideAllowedTokens', v)}
        />
      </div>
      {/* Styles? */}
      <HeadingSecondary>Colors</HeadingSecondary>
      <div className="full mx-auto -mt-4 flex flex-wrap justify-around space-x-4">
        {colorOptions.map(({ label, value, description }) => (
          <div key={value} className="flex flex-col py-8">
            <FormFieldTitleInput title={label} description={description} />
            <div className="mb-3 self-center">
              <HexColorPicker
                color={values.colors?.[value] || undefined}
                onChange={(color) => setFieldValue(`colors.${value}`, color)}
              />
            </div>
            <div className="self-center">
              <TextInput
                disabled={false}
                hasError={
                  !!values.colors?.[value] &&
                  values.colors?.[value] !== '' &&
                  !!errors.colors?.[value as keyof typeof errors.colors]
                }
                placeholder={'Enter color hex code'}
                value={values.colors?.[value]}
                onChange={(e) =>
                  e.target.value[0] === '#'
                    ? handleColorChange(e.target.value, value)
                    : handleColorChange(`#${e.target.value}`, value)
                }
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
