import { FC, ReactElement, Suspense } from 'react';
import { SelectedMenu } from './modules/selected-menu';
import { trpc } from '@fms/trpc-client';
import { useParams } from 'react-router-dom';
import { currencyFormat } from '@fms/utilities';

export const MenuDetailPage: FC = (): ReactElement => {
  const { id } = useParams();

  const listVariant = [
    { name: 'Large', value: 'large', price: '5000' },
    { name: 'Reguler', value: 'reguler', price: 'Gratis' },
  ];

  const listIceLevel = [
    { name: 'No Ice', value: 'no' },
    { name: 'Less Ice', value: 'less' },
    { name: 'Normal Ice', value: 'normal' },
    { name: 'Extra Ice', value: 'extra' },
  ];

  const sugarLevel = [
    { name: 'No Sugar', value: 'no' },
    { name: 'Less Sugar', value: 'less' },
    { name: 'Normal Sugar', value: 'normal' },
    { name: 'Extra Sugar', value: 'extra' },
  ];

  const topping = [
    { name: 'ice cream mango', value: 'mango', price: '5000' },
    { name: 'ice cream cokelat', value: 'cokelat', price: '5000' },
    { name: 'ice cream vanilla', value: 'vanilla', price: '5000' },
    { name: 'ice cream strawberry', value: 'strawberry', price: '5000' },
    { name: 'macchiato cream', value: 'macchiato', price: '5000' },
    { name: 'cheese cream', value: 'cheese', price: '5000' },
    { name: 'oreo cookie crumb', value: 'oreo', price: '5000' },
    { name: 'ice cream avocado', value: 'avocado', price: '5000' },
  ];

  const { data } = trpc.product.findOne.useQuery({ id });

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <section className="w-full min-h-screen relative bg-grey-100 overflow-y-auto pb-16 mb-16">
        <div className="flex flex-col gap-y-3 p-4 bg-white">
          <figure>
            <img
              src={data?.image || '/no-photo.jpg'}
              alt="noPhoto"
              width={200}
              height={200}
              className="object-cover bg-cover w-full rounded-lg border border-grey-100 shadow-sm"
            />
            <figcaption className="text-2xl font-bold mt-3">
              {data?.name}
            </figcaption>
          </figure>
          <div className="text-grey-900">
            <p>{data?.description}</p>
          </div>
          <div className="font-bold text-xl">
            <h3>{currencyFormat(data?.priceSelling as number)}</h3>
          </div>
        </div>
        <div className="flex flex-col gap-y-2 mt-2 bg-white p-4">
          <div className="border-b border-b-slate border-dotted py-2">
            <h2 className="font-bold text-xl text-grey-950">Variant</h2>
            <small className="text-primary ">
              Harus Dipilih . <span className="text-grey-500">Pilih 1</span>
            </small>
          </div>
          <ul>
            {listVariant.map((variant, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between p-2 border-b border-b-slate"
              >
                <p className="text-lg">{variant.name}</p>
                <div className="flex gap-x-2">
                  <label htmlFor={variant.value}>{`${
                    variant.price !== 'Gratis' ? '+ ' : ''
                  }${variant.price}`}</label>
                  <input id={variant.value} type="radio" />
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-y-2 mt-2 bg-white p-4">
          <div className="border-b border-b-slate border-dotted py-2">
            <h2 className="font-bold text-xl text-grey-950">Ice Level</h2>
            <small className="text-primary ">
              Harus Dipilih . <span className="text-grey-500">Pilih 1</span>
            </small>
          </div>
          <ul>
            {listIceLevel.map((iceLevel, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between p-2 border-b border-b-slate"
              >
                <p>{iceLevel.name}</p>
                <div className="flex gap-x-2">
                  <label htmlFor={iceLevel.value}>Gratis</label>
                  <input id={iceLevel.value} type="radio" />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-y-2 mt-2 bg-white p-4">
          <div className="border-b border-b-slate border-dotted py-2">
            <h2 className="font-bold text-xl text-grey-950">Sugar Level</h2>
            <small className="text-primary ">
              Harus Dipilih . <span className="text-grey-500">Pilih 1</span>
            </small>
          </div>
          <ul>
            {sugarLevel.map((sugar, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between p-2 border-b border-b-slate"
              >
                <p>{sugar.name}</p>
                <div className="flex gap-x-2">
                  <label htmlFor="regular">Gratis</label>
                  <input id="regular" type="radio" />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-y-2 mt-2 bg-white p-4">
          <div className="border-b border-b-slate border-dotted py-2">
            <h2 className="font-bold text-xl text-grey-950">Pilihan Topping</h2>
            <small className="text-primary ">
              Opsional . <span className="text-grey-500">Pilih maks. 3</span>
            </small>
          </div>
          <ul>
            {topping.map((topping, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between p-2 border-b border-b-slate capitalize"
              >
                <p>{topping.name}</p>
                <div className="flex gap-x-2">
                  <label htmlFor={topping.value}>{`${
                    topping.price !== 'Gratis' ? '+ ' : ''
                  }${topping.price}`}</label>
                  <input id={topping.value} type="radio" />
                </div>
              </li>
            ))}
          </ul>
        </div>
        <SelectedMenu />
      </section>
    </Suspense>
  );
};
