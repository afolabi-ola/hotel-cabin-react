import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');
  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  //export const supabaseUrl = 'https://mzfimxeobcppdggjnpmg.supabase.co';
  //https://mzfimxeobcppdggjnpmg.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  //https://mzfimxeobcppdggjnpmg.supabase.co/storage/v1/object/public/cabin-images/0.5499292346234546-cabin-008.jpg

  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    '/',
    '',
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. create/edit cabin
  let query = supabase.from('cabins');

  //a. create
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  //b. edit
  if (id)
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq('id', id)
      .select();
  //c. get the updated/created cabin
  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be created');
  }

  // 2. upload image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);

  //delete the cabin if there was an error uploading image
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id);
    console.error(storageError);
    throw new Error(
      'Cabin image could not be uploaded and the cabin was not created',
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);
  if (error) {
    console.error(error);
    throw new Error('Cabin could not be deleted');
  }
  return data;
}
