INSERT INTO public.account (
        account_firstname,
        account_lastname,
        account_email,
        account_password,
        account_type
    )
VALUES (
        'Tony',
        'Stark',
        'tony@starkent.com',
        'Iam1ronM@nTony',
        'Admin'
    );
-- Delete info
DELETE FROM public.account
where account_email = 'tony@starkent.com';
-- Update data
UPDATE public.inventory
SET inv_description = 'The Hummer gives you a huge interior with an engine to get you out of any muddy or rocky situation.'
WHERE inv_make = 'GM'
    AND inv_model = 'Hummer';
--inner join data
SELECT i.inv_make,
    i.inv_model,
    c.classification_name
FROM public.inventory AS i
    INNER JOIN public.classification AS c ON i.classification_id = c.classification_id
WHERE c.classification_name = 'Sport';
--update records
UPDATE public.inventory
SET inv_image = REPLACE(inv_image, '/images', '/vehicles/images'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images', '/vehicles/images');