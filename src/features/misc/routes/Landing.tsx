import { PublicLayout } from "~/components/Layout/PublicLayout";

export const Landing = () => {
  return (
    <PublicLayout>
      <div>
        {[...new Array(342)]
          .map(
            () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
          )
          .join("\n")}
      </div>
    </PublicLayout>
  );
};
